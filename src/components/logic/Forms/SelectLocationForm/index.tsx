import { Form } from 'antd';

import { SelectLocationFormItem } from 'src/components/ui/FormItems/SelectLocationFormItem';
import { FORMS } from 'src/config/constants';

export const SelectLocationForm = () => {
  const onFinish = () => {};
  const onFinishFailed = () => {};

  return (
    <Form
      name={FORMS.SELECT_LOCATION_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <SelectLocationFormItem />
    </Form>
  );
};
