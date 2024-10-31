import { Button, Form } from 'antd';
import { useCountdown } from '../../../../hooks/useCountdown';

interface VerificationButtonFormItemProps {
  title: string;
  className?: string;
  onSubmit: (code: string) => Promise<void>;
  code: string;
}

export const VerificationButtonFormItem = ({
  title,
  className,
  onSubmit,
  code,
}: VerificationButtonFormItemProps) => {
  const { timer, isDisabled, resetCountdown } = useCountdown(5);
  const handleResend = async () => {
    resetCountdown();
    await onSubmit(code);
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
        {isDisabled ? `${title} (${timer}с)` : title}
      </Button>
    </Form.Item>
  );
};
