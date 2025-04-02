import { useCallback, useEffect, useState } from 'react';
import { Form, FormInstance } from 'antd';

import { Input, InputType } from 'src/components/Input';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';
import { REGEXS } from 'src/config/constants';
import { useUserStore } from 'src/stores/userStore';

import styles from './styles.module.scss';

interface ContactInfoEditModeProps {
  form: FormInstance;
  onChange: () => void;
  onContactInfoValidation: (isValid: boolean) => void;
}

export const ContactInfoEditMode = ({
  form,
  onChange,
  onContactInfoValidation,
}: ContactInfoEditModeProps) => {
  const [isValid, setIsValid] = useState(false);
  const { user } = useUserStore();

  const rules = [
    { required: false, message: VALIDATION_MESSAGE.REQUIRED },
    {
      pattern: VALIDATION_CONDITION.PHONE_INPUT.pattern,
      message: VALIDATION_MESSAGE.INVALID_PHONE,
    },
  ];

  const handleEmailChange = useCallback(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setFieldValue(
        'email',
        e.target.value.replace(REGEXS.notAsciiChars, '')
      );
    },
    [form]
  );

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitizedValue = e.target.value.replace(/\D/g, '');

      form.setFieldValue('phoneNumber', sanitizedValue);
    },
    [form]
  );

  const allValues = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        onContactInfoValidation(true);
        setIsValid(true);
      })
      .catch(() => {
        onContactInfoValidation(false);
        setIsValid(false);
      });
  }, [form, allValues]);

  return (
    <Form
      name="updateUserContactInfoForm"
      layout="vertical"
      form={form}
      initialValues={{
        email: user?.email,
        phoneNumber: user?.phoneNumber,
      }}
      onValuesChange={onChange}
      requiredMark={false}
    >
      <Form.Item
        label="Пошта"
        className={styles.formItemEmail}
        name="email"
        rules={[{ ...VALIDATION_CONDITION.EMAIL, required: false }]}
        validateTrigger="onChange"
        validateStatus={isValid ? 'success' : undefined}
      >
        <Input placeholder="Введіть пошту" onChange={handleEmailChange} />
      </Form.Item>
      <Form.Item
        label="Номер телефону"
        className={styles.formItemPhone}
        name="phoneNumber"
        validateTrigger="onChange"
        rules={rules}
      >
        <Input
          type={InputType.TEL}
          maxLength={9}
          addonBefore="+380"
          placeholder="Введіть номер телефону"
          onChange={handlePhoneChange}
        />
      </Form.Item>
    </Form>
  );
};
