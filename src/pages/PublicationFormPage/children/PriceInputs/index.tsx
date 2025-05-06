import { useState } from 'react';
import { Form, Input, ConfigProvider } from 'antd';

import { TEXT } from 'src/config/constants';
import { toFixedWithoutRounding } from 'src/utils/toFixedWithoutRounding';

import type { RuleRender } from 'rc-field-form/lib/interface';
import styles from './styles.module.scss';

export const inputs = [
  { label: TEXT.HRYVNIAS_PER_DAY, name: 'priceDay' },
  { label: TEXT.HRYVNIAS_PER_WEEK, name: 'priceWeek' },
  { label: TEXT.HRYVNIAS_PER_MONTH, name: 'priceMonth' },
];

export const PriceInputs = () => {
  const [showRequiredErr, setShowRequiredErr] = useState(false);
  const form = Form.useFormInstance();

  const minValue = 10;
  const maxValue = 999_999;

  const onChange = (inputName: string) => {
    const value = form.getFieldValue(inputName);

    if (+value > maxValue) {
      form.setFieldValue(inputName, `${maxValue}`);

      return;
    }

    // Strip to 2 decimals
    const decimals = value.split('.')[1];

    if (decimals?.length > 2) {
      form.setFieldValue(inputName, `${toFixedWithoutRounding(value, 2)}`);

      return;
    }

    // restrict negative numbers
    form.setFieldValue(inputName, Number(value) < 0 ? '0' : value);

    form.validateFields(inputs.map((input) => input.name)).catch(() => {});
  };

  const onBlur = (inputName: string) => {
    const value = form.getFieldValue(inputName);

    form.setFieldValue(inputName, value ? Number(value).toFixed(2) : value);
  };

  const priceInputValidator: RuleRender = ({ getFieldValue }) => ({
    validator(_: unknown, value: string) {
      setShowRequiredErr(false);

      if (value && +value < minValue) {
        return Promise.reject(new Error(TEXT.MIN_VALUE(minValue)));
      }

      const isModified = form.isFieldsTouched(
        inputs.map((input) => input.name)
      );

      const areInputsEmpty = inputs.every(
        (input) => !getFieldValue(input.name)
      );

      setShowRequiredErr(isModified && areInputsEmpty);

      return Promise.resolve();
    },
  });

  return (
    <div className={styles.priceInputsRow}>
      <ConfigProvider theme={localTheme}>
        {inputs.map(({ label, name }, i) => (
          <Form.Item
            key={name}
            label={label}
            name={name}
            rules={[priceInputValidator]}
            validateStatus={showRequiredErr ? 'error' : undefined}
            className={
              i === 1
                ? `${styles.middleFormItem} ${styles.priceLabel}`
                : styles.priceLabel
            }
          >
            <Input
              type="number"
              prefix="₴"
              placeholder="0.00"
              className={styles.priceInput}
              onChange={() => onChange(name)}
              onBlur={() => onBlur(name)}
            />
          </Form.Item>
        ))}
      </ConfigProvider>
      {showRequiredErr && (
        <p className={styles.inputsError}>
          Принаймні одна ціна має бути вказана
        </p>
      )}
    </div>
  );
};

const localTheme = {
  components: {
    InputNumber: {
      inputFontSize: 16,
      lineHeight: 1.5,
    },
  },
};
