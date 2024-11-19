export const TEXT = {
  ADD_ADVERTISEMENT: 'Додати оголошення',
  ALLOW_DATA_PROCESSING:
    'Я даю згоду на обробку моїх персональних даних та підтверджую ознайомлення з угодою користувача',
  ALREADY_HAVE_ACCOUNT: 'У вас є акаунт? ',
  AUTHORIZE: 'Авторизуватися',

  CHOOSE_LOCATION: 'Виберіть локацію',
  CONFIRMATION_PASSWORD: 'Повторіть пароль',

  EMAIL: 'Пошта',

  FORGOT_PASSWORD: 'Забули пароль?',

  HELPER_TEXT_EMAIL: 'Дотримуйтесь шаблону youremil@gmail.com',
  HELPER_TEXT_PASSWORD:
    'Пароль може містити тільки A p # 4 і бути не менше 8 символів',

  INPUT_EMAIL: 'Введіть пошту',
  INPUT_PASSWORD: 'Введіть пароль',

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
  SELECT_LOCATION_FORM: 'selectLocationForm',
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
