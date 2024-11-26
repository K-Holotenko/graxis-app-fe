import { Form } from 'antd';

import { FORMS } from '../../../../config/constants';
import { SelectLocationFormItem } from 'components/ui/FormItems/SelectLocationFormItem';

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
