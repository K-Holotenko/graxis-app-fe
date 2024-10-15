import { InputField } from '../InputField/InputField';
import { auth } from '../../config/auth/auth';

export const PasswordInput = () => (
  <InputField
    name="password"
    label={auth.passwordLabel}
    rules={[{ required: true, message: auth.passwordRequiredMessage }]}
    placeholder={auth.passwordPlaceholder}
    type="password"
    hasFeedback
  />
);
