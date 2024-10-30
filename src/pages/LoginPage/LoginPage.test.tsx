import { render, screen } from '@testing-library/react';

import { LoginPage } from '.';
import { LOGIN_PAGE_CONSTANTS } from './utils/constants';
import { TEXT } from 'config/constants';

describe('LoginPage', () => {
  test('renders PageContainer with the correct photo', () => {
    render(<LoginPage />);
    const mainPhoto = screen.getByText(LOGIN_PAGE_CONSTANTS.IMAGE_SRC);

    expect(mainPhoto).toBeInTheDocument();
  });

  test('renders PageContainer with the correct title', () => {
    render(<LoginPage />);
    const pageTitle = screen.getByText(LOGIN_PAGE_CONSTANTS.PAGE_TITLE);

    expect(pageTitle).toBeInTheDocument();
  });

  test('renders PageContainer with the correct title', () => {
    render(<LoginPage />);
    const emailTabTitle = screen.getByText(
      LOGIN_PAGE_CONSTANTS.FORM.EMAIL_TAB.TITLE
    );

    expect(emailTabTitle).toBeInTheDocument();
  });

  test('renders PageContainer with the correct title', () => {
    render(<LoginPage />);
    const phoneTabTitle = screen.getByText(
      LOGIN_PAGE_CONSTANTS.FORM.PHONE_TAB.TITLE
    );

    expect(phoneTabTitle).toBeInTheDocument();
  });

  test('renders PageContainer with the correct title', () => {
    render(<LoginPage />);
    const emailTitle = screen.getByText(TEXT.EMAIL);

    expect(emailTitle).toBeInTheDocument();
  });

  test('renders PageContainer with the correct title', () => {
    render(<LoginPage />);
    const passwordTitle = screen.getByText(TEXT.PASSWORD);

    expect(passwordTitle).toBeInTheDocument();
  });

  test('renders PageContainer with the correct title "OR"', () => {
    render(<LoginPage />);
    const orTitle = screen.getByText(TEXT.OR);

    expect(orTitle).toBeInTheDocument();
  });

  test('renders PageContainer with the correct text in submit button', () => {
    render(<LoginPage />);
    const submitButtonText = screen.getByText(TEXT.SUBMIT);

    expect(submitButtonText).toBeInTheDocument();
  });

  test('renders PageContainer with the correct text "Forgot password?" in button', () => {
    render(<LoginPage />);
    const forgotPasswordButtonText = screen.getByText(TEXT.SUBMIT);

    expect(forgotPasswordButtonText).toBeInTheDocument();
  });

  test('renders PageContainer with the correct text "No account?"', () => {
    render(<LoginPage />);
    const noAccount = screen.getByText(TEXT.NO_ACCOUNT);

    expect(noAccount).toBeInTheDocument();
  });

  test('renders PageContainer with the correct text "Register" in button', () => {
    render(<LoginPage />);
    const RegisterButtonText = screen.getByText(TEXT.REGISTER);

    expect(RegisterButtonText).toBeInTheDocument();
  });
});
