import { ROUTES } from 'src/router/routes';
import InstagramIcon from '../../assets/icons/instagram-icon-dark.svg';
import LinkedInIcon from '../../assets/icons/linkedin-icon-dark.svg';
import TikTokIcon from '../../assets/icons/tiktok-icon-dark.svg';
import TelegramIcon from '../../assets/icons/telegram-icon-dark.svg';

export const TEXT = {
  ADD_ADVERTISEMENT: 'Додати оголошення',
  ALLOW_DATA_PROCESSING:
    'Я даю згоду на обробку моїх персональних даних та підтверджую ознайомлення з угодою користувача',
  ALREADY_HAVE_ACCOUNT: 'У вас є акаунт?',
  AUTHORIZE: 'Авторизуватися',

  CATEGORIES: 'Категорії',
  CHOOSE_LOCATION: 'Виберіть локацію',
  CONFIRMATION_PASSWORD: 'Повторіть пароль',
  CONTACT_US: 'Звʼяжіться з нами',
  CURRENCY_PER_TIME: 'грн / год',

  EMAIL: 'Пошта',

  FAST_LINKS: 'Швидкі посилання',
  FEEDBACKS: 'Відгуки',
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
  POPULAR_NOW: 'Популярне зараз',

  REGISTER: 'Зареєструватись',
  RIGHTS: '© 2024 Graxis. Всі права захищено. Політика конфіденційності',

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

export const SOCIAL_MEDIA_LIST = [
  {
    key: 'instagram',
    name: 'Instagram',
    icon: InstagramIcon,
    alt: 'Instagram icon',
    href: '',
  },
  {
    key: 'linkedin',
    name: 'LinkedIn',
    icon: LinkedInIcon,
    alt: 'LinkedIn icon',
    href: '',
  },
  {
    key: 'telegram',
    name: 'Telegram',
    icon: TelegramIcon,
    alt: 'Telegram icon',
    href: '',
  },
  {
    key: 'tiktok',
    name: 'TikTok',
    icon: TikTokIcon,
    alt: 'TikTok icon',
    href: '',
  },
];

export const APP_CONTACT_DATA = {
  email: 'info@graxis.com',
  phone: '555-555-5555',
};

export const REGEXS = {
  notAsciiChars: /[^\x00-\x7F]/g,
  upperCaseLetter: /[A-Z]/,
  lowerCaseLetter: /[a-z]/,
  digit: /\d/,
  specialChars: /[\W_]/,
};
