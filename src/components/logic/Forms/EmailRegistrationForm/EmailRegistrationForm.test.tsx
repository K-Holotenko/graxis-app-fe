import { fireEvent, render } from '@testing-library/react';

import { TEXT } from 'src/config/constants';
import { sleep } from 'src/utils/sleep';

import { EmailRegistrationForm } from './index';
import { CREATE_PASSWORD_VALIDATION_CONDITIONS } from './utils';

describe('EmailRegistrationForm', () => {
  it('should successfully validate password', async () => {
    const { getByLabelText, queryByText } = render(<EmailRegistrationForm />);

    const passwordInputEl = getByLabelText(TEXT.PASSWORD);

    fireEvent.change(passwordInputEl, { target: { value: 'Password1!' } });

    // TODO: find better solution when will be working on tests tech debt
    await sleep(1_000);

    CREATE_PASSWORD_VALIDATION_CONDITIONS.forEach((condition) => {
      const errorMessage = queryByText(condition.message);

      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  it('should fail password validation if there is no uppercase letter', async () => {
    const { getByLabelText, findByText } = render(<EmailRegistrationForm />);

    const passwordInputEl = getByLabelText(TEXT.PASSWORD);

    fireEvent.change(passwordInputEl, { target: { value: 'password1!' } });

    const errorMessage = await findByText(
      CREATE_PASSWORD_VALIDATION_CONDITIONS[1].message
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('should fail password validation if there is no lowercase letter', async () => {
    const { getByLabelText, findByText } = render(<EmailRegistrationForm />);

    const passwordInputEl = getByLabelText(TEXT.PASSWORD);

    fireEvent.change(passwordInputEl, { target: { value: 'PASSWORD1!' } });

    const errorMessage = await findByText(
      CREATE_PASSWORD_VALIDATION_CONDITIONS[2].message
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('should fail password validation if there is no digit', async () => {
    const { getByLabelText, findByText } = render(<EmailRegistrationForm />);

    const passwordInputEl = getByLabelText(TEXT.PASSWORD);

    fireEvent.change(passwordInputEl, { target: { value: 'Password!' } });

    const errorMessage = await findByText(
      CREATE_PASSWORD_VALIDATION_CONDITIONS[3].message
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('should fail password validation if there is no special character', async () => {
    const { getByLabelText, findByText } = render(<EmailRegistrationForm />);

    const passwordInputEl = getByLabelText(TEXT.PASSWORD);

    fireEvent.change(passwordInputEl, { target: { value: 'Password1' } });

    const errorMessage = await findByText(
      CREATE_PASSWORD_VALIDATION_CONDITIONS[4].message
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it("should fail password validation if's length < 8", async () => {
    const { getByLabelText, findByText } = render(<EmailRegistrationForm />);

    const passwordInputEl = getByLabelText(TEXT.PASSWORD);

    fireEvent.change(passwordInputEl, { target: { value: 'Pass1!' } });

    const errorMessage = await findByText(
      CREATE_PASSWORD_VALIDATION_CONDITIONS[5].message
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
