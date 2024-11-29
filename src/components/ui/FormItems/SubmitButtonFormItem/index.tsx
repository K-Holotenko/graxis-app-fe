import { Button, Form } from 'antd';

import { ButtonTypes } from 'src/config/constants';

interface SubmitButtonFormItemProps {
  title: string;
  type?: ButtonTypes;
  className?: string;
}

export const SubmitButtonFormItem = ({
  title = 'Submit',
  type = ButtonTypes.primary,
  className,
}: SubmitButtonFormItemProps) => (
  <Form.Item>
    <Button block type={type} htmlType="submit" className={className}>
      {title}
    </Button>
  </Form.Item>
);
