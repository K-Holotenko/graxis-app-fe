import { ROUTES } from 'router/routes';

export const TEXT = {
  ALLOW_DATA_PROCESSING:
    'Я даю згоду на обробку моїх персональних даних та підтверджую ознайомлення з угодою користувача',
  ALREADY_HAVE_ACCOUNT: 'У вас є акаунт?',
  AUTHORIZE: 'Авторизуватися',

  CONFIRMATION_PASSWORD: 'Повторіть пароль',
  CURRENCY_PER_TIME: 'грн / год',

  EMAIL: 'Пошта',

  FORGOT_PASSWORD: 'Забули пароль?',

  HELPER_TEXT_EMAIL: 'Дотримуйтесь шаблону youremil@gmail.com',
  HELPER_TEXT_PASSWORD:
    'Пароль може містити тільки A p # 4 і бути не менше 8 символів',

  INPUT_EMAIL: 'Введіть пошту',
  INPUT_PASSWORD: 'Введіть пароль',
  INPUT_PHONE: 'Введіть номер телефону',

  LOGIN: 'Увійти',

  NO_ACCOUNT: 'Не має акаунту?',

  OR: 'Або',

  PASSWORD: 'Пароль',

  PHONE: 'Номер телефону',

  REGISTER: 'Зареєструватись',

  SEC: 'c',

  SEND_SMS: 'Ми надішлемо смс для підтвердження номера',
  SEND_SMS_AGAIN: 'Надіслати повторно',
  SENT_SMS: 'Ми відправили вам підтвердження коду на ваш мобільний номер',

  SUBMIT: 'Продовжити',
};

export const FORMS = {
  EMAIL_LOGIN_FORM: 'emailLoginForm',
  PHONE_LOGIN_FORM: 'phoneLoginForm',
  EMAIL_REGISTRATION_FORM: 'emailRegistrationForm',
  PHONE_REGISTRATION_FORM: 'phoneRegistrationForm',
  VERIFICATION_FORM: 'verificationForm',
};

export const EMAIL_VERIFICATION_REDIRECT_LINK = `${process.env.REACT_APP_CLIENT_URL}${ROUTES.LOGIN}`;
