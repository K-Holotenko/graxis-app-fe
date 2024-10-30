import { render, screen } from '@testing-library/react';

import { RegistrationPage } from '.';
import { REGISTRATION_PAGE_CONSTANTS } from './utils/constants';
import { TEXT } from 'config/constants';

describe('RegistrationPage', () => {
  test('renders PageContainer with the correct photo', () => {
    render(<RegistrationPage />);
    const mainPhoto = screen.getByText(REGISTRATION_PAGE_CONSTANTS.IMAGE_SRC);

    expect(mainPhoto).toBeInTheDocument();
  });
  test('renders PageContainer with the correct title', () => {
    render(<RegistrationPage />);
    const pageTitle = screen.getByText(REGISTRATION_PAGE_CONSTANTS.PAGE_TITLE);

    expect(pageTitle).toBeInTheDocument();
  });

  test('renders PageContainer with the correct title', () => {
    render(<RegistrationPage />);
    const emailTabTitle = screen.getByText(
      REGISTRATION_PAGE_CONSTANTS.FORM.EMAIL_TAB.TITLE
    );

    expect(emailTabTitle).toBeInTheDocument();
  });

  test('renders PageContainer with the correct title', () => {
    render(<RegistrationPage />);
    const phoneTabTitle = screen.getByText(
      REGISTRATION_PAGE_CONSTANTS.FORM.PHONE_TAB.TITLE
    );

    expect(phoneTabTitle).toBeInTheDocument();
  });

  test('renders PageContainer with the correct title', () => {
    render(<RegistrationPage />);
    const emailTitle = screen.getByText(TEXT.EMAIL);

    expect(emailTitle).toBeInTheDocument();
  });

  test('renders PageContainer with the correct title', () => {
    render(<RegistrationPage />);
    const passwordTitle = screen.getByText(TEXT.PASSWORD);

    expect(passwordTitle).toBeInTheDocument();
  });

  test('renders PageContainer with the correct confirmation password title', () => {
    render(<RegistrationPage />);
    const confirmationPasswordTitle = screen.getByText(
      TEXT.CONFIRMATION_PASSWORD
    );

    expect(confirmationPasswordTitle).toBeInTheDocument();
  });
  test('renders PageContainer with the correct text in checkbox', () => {
    render(<RegistrationPage />);
    const checkboxText = screen.getByText(TEXT.ALLOW_DATA_PROCESSING);

    expect(checkboxText).toBeInTheDocument();
  });

  test('renders PageContainer with the correct text in submit button', () => {
    render(<RegistrationPage />);
    const submitButtonText = screen.getByText(TEXT.SUBMIT);

    expect(submitButtonText).toBeInTheDocument();
  });

  test('renders PageContainer with the correct title "OR"', () => {
    render(<RegistrationPage />);
    const orTitle = screen.getByText(TEXT.OR);

    expect(orTitle).toBeInTheDocument();
  });

  test('renders PageContainer with the correct "Already have account?" text', () => {
    render(<RegistrationPage />);
    const haveAccountText = screen.getByText(TEXT.ALREADY_HAVE_ACCOUNT);

    expect(haveAccountText).toBeInTheDocument();
  });

  test('renders PageContainer with the correct "Authorize" text', () => {
    render(<RegistrationPage />);
    const authorizeText = screen.getByText(TEXT.AUTHORIZE);

    expect(authorizeText).toBeInTheDocument();
  });
});
