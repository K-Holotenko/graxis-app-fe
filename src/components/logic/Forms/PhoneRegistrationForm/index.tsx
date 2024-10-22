import { Form } from 'antd';

import { FORMS, TEXT } from '../../../../config/constants';
import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
import { PhoneInputFormItem } from '../../../ui/FormItems/PhoneInputFormItem';
import { VALIDATION_CONDITION } from '../../../../config/validation';
import { CheckboxFormItem } from '../../../ui/FormItems/CheckboxFormItem';

export const PhoneRegistrationForm = () => {
  const onFinish = () => {};
  const onFinishFailed = () => {};

  return (
    <Form
      name={FORMS.PHONE_REGISTRATION_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PhoneInputFormItem label={TEXT.PHONE} />
      <CheckboxFormItem
        label={TEXT.ALLOW_DATA_PROCESSING}
        name="agreement"
        rules={[VALIDATION_CONDITION.REQUIRED]}
      />
      <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
    </Form>
  );
};
