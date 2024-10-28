import { Button, Form } from 'antd';

enum ButtonTypes {
  primary = 'primary',
}

interface SubmitButtonFormItemProps {
  title: string;
  type?: ButtonTypes;
  className?: string;
  id?: string;
}

export const SubmitButtonFormItem = ({
  title = 'Submit',
  type = ButtonTypes.primary,
  className,
  id,
}: SubmitButtonFormItemProps) => (
  <Form.Item>
    <Button block type={type} htmlType="submit" className={className} id={id}>
      {title}
    </Button>
  </Form.Item>
);
