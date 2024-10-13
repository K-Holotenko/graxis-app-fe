import React from 'react';
import { PhoneForm } from '../PhoneForm/PhoneForm';
import { CheckboxComponent } from '../CheckboxComponent/CheckboxComponent';
import { auth } from '../../constants/auth/auth';
import styles from './PhoneAuthForm.module.scss';
import { PhoneConfirmationMessage } from '../PhoneConfirmationMessage/PhoneConfirmationMessage';

export const PhoneAuthForm: React.FC = () => {
  return (
    <>
      <PhoneForm />
      <PhoneConfirmationMessage className={styles.confirmationMessage}>
        {auth.confirmationMessage}
      </PhoneConfirmationMessage>
      <CheckboxComponent />
    </>
  );
};
