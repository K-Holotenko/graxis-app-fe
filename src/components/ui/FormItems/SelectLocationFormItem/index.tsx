import { Form, Select } from 'antd';
import { Rule } from 'antd/es/form';

import { CITY_LIST } from 'config/constants';

interface SelectLocationFormItemProps {
  rules?: Rule[];
}

export const SelectLocationFormItem = ({
  rules = [],
}: SelectLocationFormItemProps) => (
  <Form.Item name="location" rules={rules} noStyle={true}>
    <Select
      variant="borderless"
      options={CITY_LIST}
      defaultValue={CITY_LIST?.[0]?.value}
      style={{ width: '100%', minWidth: 120 }}
    />
  </Form.Item>
);
