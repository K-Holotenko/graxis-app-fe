import { InputField } from '../InputField/InputField';
import { auth } from '../../config/auth/auth';

export const EmailInput = () => (
  <InputField
    name="email"
    label={auth.emailLabel}
    rules={[
      { type: 'email', message: auth.emailInvalidMessage },
      { required: true, message: auth.emailRequiredMessage },
    ]}
    placeholder={auth.emailPlaceholder}
    type="email"
  />
);
