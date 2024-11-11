import { Button, Form } from 'antd';
import { useCountdown } from '../../../../hooks/useCountdown';
import { TEXT } from 'config/constants';
import './styles.scss';

interface VerificationButtonFormItemProps {
  title: string;
}

export const VerificationButtonFormItem = ({
  title,
}: VerificationButtonFormItemProps) => {
  const { timer, isDisabled, resetCountdown } = useCountdown(5);
  const buttonClass = isDisabled ? 'verif-sms-btn verif-sms-btn-disabled' : 'verif-sms-btn verif-sms-btn-active';
  return (
    <Form.Item>
      <Button
        key={isDisabled ? 'verif-sms-btn verif-sms-btn-disabled' : 'verif-sms-btn verif-sms-btn-active'}
        block
        type="link"
        htmlType="button"
        onClick={resetCountdown}
        disabled={isDisabled}
        className={buttonClass}
      >
        {isDisabled ? `${title} (${timer}${TEXT.SEC})` : title}
      </Button>
    </Form.Item>
  );
};
