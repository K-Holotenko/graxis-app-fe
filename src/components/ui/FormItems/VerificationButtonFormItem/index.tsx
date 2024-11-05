import { Button, Form } from 'antd';
import { useCountdown } from '../../../../hooks/useCountdown';
import { TEXT } from 'config/constants';

interface VerificationButtonFormItemProps {
  title: string;
  className?: string;
  code: string;
  id: string;
}

export const VerificationButtonFormItem = ({
  title,
  className,
}: VerificationButtonFormItemProps) => {
  const { timer, isDisabled, resetCountdown } = useCountdown(5);
  const handleResend = async () => {
    resetCountdown();
  };

  return (
    <Form.Item>
      <Button
        block
        type="link"
        htmlType="button"
        onClick={handleResend}
        disabled={isDisabled}
        className={className}
      >
        {isDisabled ? `${title} (${timer}${TEXT.SEC})` : title}
      </Button>
    </Form.Item>
  );
};
