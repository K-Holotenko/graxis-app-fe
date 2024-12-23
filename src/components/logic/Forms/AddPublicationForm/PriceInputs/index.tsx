import { useState } from 'react';
import { Form, Input, ConfigProvider } from 'antd';

import { ReactComponent as HryvniaIcon } from 'src/assets/icons/hryvnia.svg';
import { TEXT } from 'src/config/constants';

import type { RuleRender } from 'rc-field-form/lib/interface';
import s from './styles.module.scss';

export function PriceInputs() {
  const [showRequiredErr, setShowRequiredErr] = useState(false);
  const form = Form.useFormInstance();

  const onChange = (inputName: string) => {
    const value = form.getFieldValue(inputName);

    // Strip to 2 decimals
    const decimals = value.split('.')[1];

    if (decimals?.length > 2) {
      form.setFieldValue(inputName, Number(value).toFixed(2));

      return;
    }

    // restrict negative numbers
    form.setFieldValue(inputName, Number(value) < 0 ? '0' : value);

    form
      .validateFields(['priceDay', 'priceWeek', 'priceMonth'])
      .catch(() => {});
  };

  const onBlur = (inputName: string) => {
    const value = form.getFieldValue(inputName);

    form.setFieldValue(inputName, value ? Number(value).toFixed(2) : value);
  };

  const priceInputValidator: RuleRender = ({ getFieldValue }) => ({
    validator(_: unknown, value: string) {
      const minValue = 10;
      const maxValue = 999_999;

      setShowRequiredErr(false);

      if (value) {
        if (+value < minValue) {
          return Promise.reject(new Error(TEXT.MIN_VALUE(minValue)));
        }

        if (+value > maxValue) {
          return Promise.reject(new Error(TEXT.MAX_VALUE(maxValue)));
        }
      }

      if (
        !getFieldValue('priceDay') &&
        !getFieldValue('priceWeek') &&
        !getFieldValue('priceMonth')
      ) {
        setShowRequiredErr(true);

        return Promise.reject();
      }

      return Promise.resolve();
    },
  });

  return (
    <>
      <h4 className="addPublicationLabel">{TEXT.COST}</h4>
      <div className={s.priceInputsRow}>
        <ConfigProvider
          theme={{
            components: {
              InputNumber: { inputFontSize: 16, lineHeight: 1.5 },
            },
          }}
        >
          <Form.Item
            label={TEXT.HRYVNIAS_PER_DAY}
            name="priceDay"
            rules={[priceInputValidator]}
            validateStatus={showRequiredErr ? 'error' : undefined}
          >
            <Input
              type="number"
              prefix={<HryvniaIcon />}
              placeholder="0.00"
              className={s.priceInput}
              onChange={() => onChange('priceDay')}
              onBlur={() => onBlur('priceDay')}
            />
          </Form.Item>
          <Form.Item
            label={TEXT.HRYVNIAS_PER_WEEK}
            name="priceWeek"
            rules={[priceInputValidator]}
            className={s.middleFormItem}
            validateStatus={showRequiredErr ? 'error' : undefined}
          >
            <Input
              type="number"
              prefix={<HryvniaIcon />}
              placeholder="0.00"
              className={s.priceInput}
              onChange={() => onChange('priceWeek')}
              onBlur={() => onBlur('priceWeek')}
            />
          </Form.Item>
          <Form.Item
            label={TEXT.HRYVNIAS_PER_MONTH}
            name="priceMonth"
            rules={[priceInputValidator]}
            validateStatus={showRequiredErr ? 'error' : undefined}
          >
            <Input
              type="number"
              prefix={<HryvniaIcon />}
              placeholder="0.00"
              className={s.priceInput}
              onChange={() => onChange('priceMonth')}
              onBlur={() => onBlur('priceMonth')}
            />
          </Form.Item>
        </ConfigProvider>
        {showRequiredErr && (
          <p className={`${s.inputsError} ant-form-item-explain-error`}>
            {TEXT.SET_AT_LEAST_ONE_PRICE}
          </p>
        )}
      </div>
    </>
  );
}
