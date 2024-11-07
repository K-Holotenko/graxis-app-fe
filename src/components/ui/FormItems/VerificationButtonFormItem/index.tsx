import { Button, Form } from 'antd';
import { useCountdown } from '../../../../hooks/useCountdown';
import { TEXT } from 'config/constants';

interface VerificationButtonFormItemProps {
  title: string;
  className?: string;
}

export const VerificationButtonFormItem = ({
  title,
  className,
}: VerificationButtonFormItemProps) => {
  const { timer, isDisabled, resetCountdown } = useCountdown(5);

  return (
    <Form.Item>
      <Button
        block
        type="link"
        htmlType="button"
        onClick={resetCountdown}
        disabled={isDisabled}
        className={className}
      >
        {isDisabled ? `${title} (${timer}${TEXT.SEC})` : title}
      </Button>
    </Form.Item>
  );
};
