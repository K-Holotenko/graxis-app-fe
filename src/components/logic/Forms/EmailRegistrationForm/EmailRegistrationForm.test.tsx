import { fireEvent, render } from '@testing-library/react';

import { EmailRegistrationForm } from './index';
import { TEXT } from '../../../../config/constants/index';
import { CREATE_PASSWORD_VALIDATION_CONDITIONS } from './utils';

describe('EmailRegistrationForm', () => {
  it('should allow password with all rules', async () => {
    const { getByLabelText, queryByText } = render(<EmailRegistrationForm />);

    const passwordInputEl = getByLabelText(TEXT.PASSWORD);

    fireEvent.change(passwordInputEl, { target: { value: 'Password1!' } });

    await new Promise((res) => setTimeout(() => res(''), 1000));

    CREATE_PASSWORD_VALIDATION_CONDITIONS.forEach((condition) => {
      const errorMessage = queryByText(condition.message);

      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  it('should not allow password without one uppercase letter', async () => {
    const { getByLabelText, findByText } = render(<EmailRegistrationForm />);

    const passwordInputEl = getByLabelText(TEXT.PASSWORD);

    fireEvent.change(passwordInputEl, { target: { value: 'password1!' } });

    const errorMessage = await findByText(
      CREATE_PASSWORD_VALIDATION_CONDITIONS[1].message
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('should not allow password without one lowercase letter', async () => {
    const { getByLabelText, findByText } = render(<EmailRegistrationForm />);

    const passwordInputEl = getByLabelText(TEXT.PASSWORD);

    fireEvent.change(passwordInputEl, { target: { value: 'PASSWORD1!' } });

    const errorMessage = await findByText(
      CREATE_PASSWORD_VALIDATION_CONDITIONS[2].message
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('should not allow password without one digit', async () => {
    const { getByLabelText, findByText } = render(<EmailRegistrationForm />);

    const passwordInputEl = getByLabelText(TEXT.PASSWORD);

    fireEvent.change(passwordInputEl, { target: { value: 'Password!' } });

    const errorMessage = await findByText(
      CREATE_PASSWORD_VALIDATION_CONDITIONS[3].message
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('should not allow password without one special character', async () => {
    const { getByLabelText, findByText } = render(<EmailRegistrationForm />);

    const passwordInputEl = getByLabelText(TEXT.PASSWORD);

    fireEvent.change(passwordInputEl, { target: { value: 'Password1' } });

    const errorMessage = await findByText(
      CREATE_PASSWORD_VALIDATION_CONDITIONS[4].message
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('should not allow password less 8 characters length', async () => {
    const { getByLabelText, findByText } = render(<EmailRegistrationForm />);

    const passwordInputEl = getByLabelText(TEXT.PASSWORD);

    fireEvent.change(passwordInputEl, { target: { value: 'Pass1!' } });

    const errorMessage = await findByText(
      CREATE_PASSWORD_VALIDATION_CONDITIONS[5].message
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
