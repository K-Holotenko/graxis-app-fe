import { Form } from 'antd';

import { FORMS } from 'src/config/constants';

export const AddListingForm = () => {
  const onFinish = () => {};
  const onFinishFailed = () => {};

  return (
    <Form
      name={FORMS.ADD_LISTING_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    ></Form>
  );
};
