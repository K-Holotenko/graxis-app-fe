import { ROUTES } from 'src/router/routes';
import InstagramIcon from 'src/assets/icons/instagram-icon-dark.svg';
import LinkedInIcon from 'src/assets/icons/linkedin-icon-dark.svg';
import TikTokIcon from 'src/assets/icons/tiktok-icon-dark.svg';
import TelegramIcon from 'src/assets/icons/telegram-icon-dark.svg';

export const FORMS = {
  EMAIL_LOGIN_FORM: 'emailLoginForm',
  PHONE_AUTH_FORM: 'phoneAuthForm',
  EMAIL_REGISTRATION_FORM: 'emailRegistrationForm',
  SELECT_LOCATION_FORM: 'selectLocationForm',
  VERIFICATION_FORM: 'verificationForm',
  ADD_PUBLICATION_FORM: 'addPublicationForm',
  ADD_USER_INFO_FORM: 'addUserInfoForm',
};

export const SCREEN_WIDTH = { XXL: 1600, XL: 1200, LG: 992, MD: 768, SM: 576 };

export const IMAGE_DESCRIPTION = {
  LOGO: 'Logo',
  MAP_PIN_ICON: 'Map pin icon',
  NOTIFICATION_ICON: 'Notification icon',
  USER_ICON: 'User icon',
  PLUS_ICON: 'Plus icon',
  SUCCESS: 'Success icon',
};

export const CITY_LIST = [
  { value: 'Київ', label: 'Київ' },
  { value: 'Львів', label: 'Львів' },
];

export enum ButtonTypes {
  primary = 'primary',
  default = 'default',
  link = 'link',
}

export enum ThemeMode {
  light = 'light',
  dark = 'dark',
}

export const EMAIL_VERIFICATION_REDIRECT_LINK = `${import.meta.env.VITE_APP_CLIENT_URL}${ROUTES.ADD_USER_INFO}`;

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
    href: 'https://t.me/+FB2vFZqthEVlMTAy',
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
  email: 'info@graxis.net',
  phone: '555-555-5555',
};

export const REGEXS = {
  notAsciiChars: /[^\x00-\x7F]/g,
  upperCaseLetter: /[A-Z]/,
  lowerCaseLetter: /[a-z]/,
  digit: /\d/,
  specialChars: /[\W_]/,
};

export const CATEGORIES_CARD_NAME = {
  POWER: 'Енергозабезпечення',
  TECH: 'Техніка та електроніка',
  OTHER: 'Інше',
  SUGGESTION: 'Запропонуйте категорію',
};

export const CATEGORIES_DROP_TEXT = {
  energy: 'Енергозабезпечення',
  generators: 'Генератори',
  stations: 'Зарядні станції',
  lighting: 'Освітлення',

  tech: 'Техніка та електроніка',
  photoVideo: 'Фото/Відео',
  cameras: 'Цифрові фотоапарати',
  videoCameras: 'Відеокамери',
  actionCameras: 'Екшн-камери',
  lenses: "Об'єктиви",
  tripods: 'Штативи / моноподи',
  flashes: 'Фотоспалахи',
  accessories: 'Аксесуари для фото / відеокамер',
  optics: 'Телескопи / біноклі',

  audio: 'Аудіотехніка',
  mp3Players: 'Mp3 плеєри',
  boomboxes: 'Магнітоли',
  musicCenters: 'Музичні центри',
  speakers: 'Акустичні системи',
  headphones: 'Навушники',
  radios: 'Радіоприймачі',
  portableSpeakers: 'Портативна акустика',
  amplifiers: 'Підсилювачі / ресивери',
  otherAudio: 'Інша аудіотехніка',

  consoles: 'Приставки',
  tvConsoles: 'TV',
  gamingConsoles: 'Ігрові',

  projectors: 'Проектори',

  other: 'Інше',
  books: 'Книги',
  games: 'Ігри',
  kids: 'Дитячі товари',
};

export const PROFILE_PARAMS = {
  PROFILE: 'profile',
  PAYMENT: 'payment',
  PRIVACY_POLICY: 'privacy-policy',
  FAQ: 'faq',
};

export const GRAXIS_API_URL =
  'https://graxis-be-774272313958.europe-central2.run.app';
