import { Form } from 'antd';

import { FORMS } from 'src/config/constants';

export const AddPublicationForm = () => {
  const onFinish = () => {};
  const onFinishFailed = () => {};

  return (
    <Form
      name={FORMS.ADD_PUBLICATION_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    ></Form>
  );
};
