import { Form } from 'antd';

import { FORMS, TEXT } from '../../../../config/constants';
import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
import { PhoneInputFormItem } from '../../../ui/FormItems/PhoneInputFormItem';

export const PhoneLoginForm = () => {
  const onFinish = () => {};

  const onFinishFailed = () => {};

  return (
    <Form
      name={FORMS.PHONE_LOGIN_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PhoneInputFormItem label={TEXT.PHONE} />
      <SubmitButtonFormItem
        title={TEXT.SUBMIT}
        className="mt-20"
        id="phone-login-btn"
      />
    </Form>
  );
};
