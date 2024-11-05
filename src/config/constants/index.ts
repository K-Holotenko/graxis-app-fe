import { ROUTES } from 'router/routes';

export const TEXT = {
  ALLOW_DATA_PROCESSING:
    'Я даю згоду на обробку моїх персональних даних та підтверджую ознайомлення з угодою користувача',
  ALREADY_HAVE_ACCOUNT: 'У вас є акаунт? ',
  AUTHORIZE: 'Авторизуватися',

  CONFIRMATION_PASSWORD: 'Повторіть пароль',

  EMAIL: 'Пошта',

  FORGOT_PASSWORD: 'Забули пароль?',

  LOGIN: 'Увійти',

  NO_ACCOUNT: 'Не має акаунту? ',

  OR: 'Або',

  PASSWORD: 'Пароль',
  PHONE: 'Номер телефону',

  REGISTER: 'Зареєструватись',

  SUBMIT: 'Продовжити',
};

export const FORMS = {
  EMAIL_LOGIN_FORM: 'emailLoginForm',
  PHONE_LOGIN_FORM: 'phoneLoginForm',
  EMAIL_REGISTRATION_FORM: 'emailRegistrationForm',
  PHONE_REGISTRATION_FORM: 'phoneRegistrationForm',
};

export const EMAIL_VERIFICATION_REDIRECT_LINK = `${process.env.REACT_APP_CLIENT_URL}${ROUTES.LOGIN}`;
