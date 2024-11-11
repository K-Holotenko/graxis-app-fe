import { useState } from 'react';
import { FormInstance } from 'antd';

export const useAuthPhoneErrorCheck = (form: FormInstance) => {
  const [isPhoneInvalid, setIsPhoneInvalid] = useState<boolean>(false);

  const onFieldsChange = () => {
    const phoneErrors = form.getFieldError('phone');
    setIsPhoneInvalid(phoneErrors.length > 0);
  };

  return {
    isPhoneInvalid,
    onFieldsChange,
  };
};