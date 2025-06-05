import { useState } from 'react';
import { Form } from 'antd';

import { TEXT } from 'src/config/constants';
import { NumberInput } from 'src/pages/PublicationFormPage/children/NumberInput';

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

  const handleChange = (field: string, value: string) => {
    if (+value > maxValue) {
      form.setFieldValue(field, `${maxValue}`);
    } else {
      form.setFieldValue(field, value);
    }

    form.validateFields(inputs.map((input) => input.name)).catch(() => {});
  };

  const handleBlur = (inputName: string) => {
    const value = form.getFieldValue(inputName);

    form.setFieldValue(inputName, +value < minValue ? '' : value);
  };

  const priceInputValidator: RuleRender = ({ getFieldValue }) => ({
    validator(_, value: string) {
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

  const getItemClassName = (fieldName: string, idx: number) => {
    const hasFieldError = form.getFieldError(fieldName).length > 0;

    return [
      styles.priceLabel,
      idx === 1 && styles.middleFormItem,
      showRequiredErr && hasFieldError && styles.errorMargin,
    ]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div className={styles.priceInputsRow}>
      {inputs.map(({ label, name }, idx) => (
        <Form.Item
          key={name}
          label={label}
          name={name}
          rules={[priceInputValidator]}
          validateStatus={showRequiredErr ? 'error' : undefined}
          className={getItemClassName(name, idx)}
        >
          <NumberInput
            value={form.getFieldValue(name) || ''}
            prefix="₴"
            placeholder="0.00"
            className={styles.priceInput}
            onChange={(val) => handleChange(name, val)}
            onBlur={() => handleBlur(name)}
          />
        </Form.Item>
      ))}
      {showRequiredErr && (
        <p className={styles.inputsError}>
          Принаймні одна ціна має бути вказана
        </p>
      )}
    </div>
  );
};
