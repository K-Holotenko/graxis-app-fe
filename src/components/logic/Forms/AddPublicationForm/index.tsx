import { Form, Input, ConfigProvider } from 'antd';

import { FORMS } from 'src/config/constants';
import { ReactComponent as HryvniaIcon } from 'src/assets/icons/hryvnia.svg';

import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import s from './styles.module.scss';

type AddPublicationInputs = {
  'price-day': string;
  'price-week': string;
  'price-month': string;
};

export const AddPublicationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: AddPublicationInputs) => {
    // eslint-disable-next-line no-console
    console.log('Success:', { values });
  };

  const onFinishFailed = (
    errorInfo: ValidateErrorEntity<AddPublicationInputs>
  ) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', { errorInfo });
  };

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
  };

  const onBlur = (inputName: string) => {
    const value = form.getFieldValue(inputName);

    form.setFieldValue(inputName, Number(value).toFixed(2));
  };

  const priceInputValidator = () => ({
    validator(_: unknown, value: string) {
      const minValue = 10;
      const maxValue = 999_999;

      if (+value < minValue) {
        return Promise.reject(new Error(`Min value is ${minValue}`));
      }

      if (+value > maxValue) {
        return Promise.reject(new Error(`Max value is ${maxValue}`));
      }

      return Promise.resolve();
    },
  });

  return (
    <Form
      form={form}
      name={FORMS.ADD_PUBLICATION_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div className={s.priceInputsRow}>
        <ConfigProvider
          theme={{
            components: {
              InputNumber: { inputFontSize: 16, lineHeight: 1.5 },
            },
          }}
        >
          <Form.Item
            label="грн/день"
            name="price-day"
            rules={[priceInputValidator]}
          >
            <Input
              type="number"
              prefix={<HryvniaIcon />}
              placeholder="0.00"
              className={s.priceInput}
              onChange={() => onChange('price-day')}
              onBlur={() => onBlur('price-day')}
            />
          </Form.Item>
          <Form.Item
            label="грн/тиждень"
            name="price-week"
            rules={[priceInputValidator]}
          >
            <Input
              type="number"
              prefix={<HryvniaIcon />}
              placeholder="0.00"
              className={s.priceInput}
              onChange={() => onChange('price-week')}
              onBlur={() => onBlur('price-week')}
            />
          </Form.Item>
          <Form.Item
            label="грн/місяць"
            name="price-month"
            rules={[priceInputValidator]}
          >
            <Input
              type="number"
              prefix={<HryvniaIcon />}
              placeholder="0.00"
              className={s.priceInput}
              onChange={() => onChange('price-month')}
              onBlur={() => onBlur('price-month')}
            />
          </Form.Item>
        </ConfigProvider>
      </div>
      <button style={{ height: 40 }} type="submit">
        Submit
      </button>
    </Form>
  );
};
