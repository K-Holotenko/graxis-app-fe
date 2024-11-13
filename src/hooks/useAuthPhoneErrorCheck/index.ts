import { useState } from 'react';
import { FormInstance } from 'antd';

export const useAuthPhoneErrorCheck = (
  form: FormInstance
): { isPhoneInvalid: boolean; onFieldsChange: () => void } => {
  const [isPhoneInvalid, setIsPhoneInvalid] = useState<boolean>(false);

  const onFieldsChange = (): void => {
    const phoneErrors = form.getFieldError('phone');

    setIsPhoneInvalid(phoneErrors.length > 0);
  };

  return {
    isPhoneInvalid,
    onFieldsChange,
  };
};
