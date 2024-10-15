import { auth } from '../../config/auth/auth';
import { PhoneForm } from '../PhoneForm/PhoneForm';
import { CheckboxComponent } from '../CheckboxComponent/CheckboxComponent';
import { PhoneConfirmationMessage } from '../PhoneConfirmationMessage/PhoneConfirmationMessage';
import styles from './PhoneAuthForm.module.scss';

export const PhoneAuthForm = () => (
  <>
    <PhoneForm />
    <PhoneConfirmationMessage className={styles.confirmationMessage}>
      {auth.confirmationMessage}
    </PhoneConfirmationMessage>
    <CheckboxComponent />
  </>
);
