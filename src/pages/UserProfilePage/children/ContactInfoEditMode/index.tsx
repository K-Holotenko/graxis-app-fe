import { Form } from 'antd';

import { Input, InputType } from 'src/components/Input';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';

import styles from './styles.module.scss';

interface ContactInfoEditModeProps {
  hasSingleFieldError: boolean;
  hasMultipleFieldErrors: boolean;
}

export const ContactInfoEditMode = ({
  hasSingleFieldError,
  hasMultipleFieldErrors,
}: ContactInfoEditModeProps) => {
  const phoneRules = [
    {
      pattern: VALIDATION_CONDITION.PHONE_INPUT.pattern,
      message: VALIDATION_MESSAGE.INVALID_PHONE,
    },
  ];

  const normalizePhoneInput = (value: string) => value.replace(/\D/g, '');

  return (
    <>
      <div
        className={`${styles.editingContactInfoEmailBlock}
        ${hasSingleFieldError ? styles.editingWarningContactInfoEmailBlock : ''}
        ${hasMultipleFieldErrors ? styles.editingErrorContactInfoEmailBlock : ''}`}
      >
        <label
          className={`${styles.editingContactInfoLabel} 
          ${hasMultipleFieldErrors ? styles.editingErrorContactInfoLabel : ''}`}
        >
          Електронна пошта
        </label>

        <Form.Item
          name="email"
          rules={[
            {
              ...VALIDATION_CONDITION.EMAIL,
              required: false,
            },
          ]}
          validateTrigger="onChange"
        >
          <Input
            type={InputType.EMAIL}
            className={`${styles.contactInfoInput} 
            ${hasSingleFieldError ? styles.warningContactInfoInput : ''}
            ${hasMultipleFieldErrors ? styles.errorContactInfoInput : ''}`}
          />
        </Form.Item>
      </div>

      <div>
        <label
          className={`${styles.editingContactInfoLabel}
          ${hasMultipleFieldErrors ? styles.editingErrorContactInfoLabel : ''}`}
        >
          Номер телефону
        </label>

        <Form.Item
          name="phoneNumber"
          rules={phoneRules}
          validateTrigger="onChange"
          normalize={normalizePhoneInput}
        >
          <Input
            type={InputType.TEL}
            maxLength={9}
            addonBefore="+380"
            className={`${styles.contactInfoInput} 
             ${hasSingleFieldError ? styles.warningContactInfoInput : ''}
            ${hasMultipleFieldErrors ? styles.errorContactInfoInput : ''}`}
          />
        </Form.Item>
      </div>
    </>
  );
};
