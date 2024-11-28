import { ROUTES } from 'router/routes';

export const TEXT = {
  ADD_ADVERTISEMENT: 'Додати оголошення',
  ALLOW_DATA_PROCESSING:
    'Я даю згоду на обробку моїх персональних даних та підтверджую ознайомлення з угодою користувача',
  ALREADY_HAVE_ACCOUNT: 'У вас є акаунт?',
  AUTHORIZE: 'Авторизуватися',

  CHOOSE_LOCATION: 'Виберіть локацію',
  CONFIRMATION_PASSWORD: 'Повторіть пароль',
  CURRENCY_PER_TIME: 'грн / год',

  EMAIL: 'Пошта',

  FORGOT_PASSWORD: 'Забули пароль?',

  HELPER_TEXT_EMAIL: 'Дотримуйтесь шаблону youremil@gmail.com',
  HELPER_TEXT_PASSWORD:
    'Пароль може містити тільки A p # 4 і бути не менше 8 символів',
  HERO_SECTION_TITLE: 'ТВОЯ ПЛАТФОРМА ДЛЯ ШЕРІНГУ',
  HERO_SECTION_SUBTITLE:
    'Шерінг речей без зайвого клопоту коли завгодно, де завгодно',

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
  SELECT_LOCATION_FORM: 'selectLocationForm',
  VERIFICATION_FORM: 'verificationForm',
};

export const SCREEN_WIDTH = { XXL: 1600, XL: 1200, LG: 992, MD: 768, SM: 576 };
export const HEADER_MOBILE_WIDTH = 905;

export const IMAGE_DESCRIPTION = {
  LOGO: 'Logo',
  MAP_PIN_ICON: 'Map pin icon',
  NOTIFICATION_ICON: 'Notification icon',
  USER_ICON: 'User icon',
  PLUS_ICON: 'Plus icon',
};

export const CITY_LIST = [
  { value: 'Київ', label: 'Київ' },
  { value: 'Львів', label: 'Львів' },
  { value: 'Одеса', label: 'Одеса' },
];

export enum ButtonTypes {
  primary = 'primary',
  default = 'default',
}

export enum ThemeMode {
  light = 'light',
  dark = 'dark',
}

export const EMAIL_VERIFICATION_REDIRECT_LINK = `${process.env.REACT_APP_CLIENT_URL}${ROUTES.LOGIN}`;

export const REGEXS = {
  notAsciiChars: /[^\x00-\x7F]/g,
  upperCaseLetter: /[A-Z]/,
  lowerCaseLetter: /[a-z]/,
  digit: /\d/,
  specialChars: /[\W_]/,
};
