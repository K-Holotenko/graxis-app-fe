import { REGEXS } from 'src/config/constants';

export const VALIDATION_MESSAGE = {
  ALREADY_REGISTERED_EMAIL: 'Цей email вже зареєстрований',
  AUTH_MESSAGE_ERROR: 'Виникла помилка. Спробуйте ще раз',

  CODE_VERIFY_ERR: 'Невірний код верифікації',

  CONFIRMATION_PASSWORD: 'Паролі не співпадають',
  EMAIL: 'Дотримуйтесь шаблону: youremail@gmail.com',
  ERROR: 'Виникла помилка',

  INVALID_PHONE:
    'Данний номер телефону вже зареєстрованно або цей номер не є дійсним',

  NOT_REGISTERED_PHONE: 'Данний номер не зареєстровано',
  REQUIRED: 'Заповніть поле',

  TRY_AGAIN: 'Щось пішло не так, спробуйте ще раз',
  NAME: 'Дозволено використовувати тільки літери, - та ʼ',
};

export const VALIDATION_CONDITION = {
  CHECKED: {
    validator: (_: unknown, value: boolean) =>
      value ? Promise.resolve() : Promise.reject(),
  },
  REQUIRED: { required: true, message: VALIDATION_MESSAGE.REQUIRED },
  NAME: {
    pattern: /^\p{L}+(?:[ '\-]\p{L}+)*$/u,
    message: VALIDATION_MESSAGE.NAME,
  },
  EMAIL: {
    required: true,
    message: VALIDATION_MESSAGE.EMAIL,
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  PASSWORD: [
    { required: true, message: VALIDATION_MESSAGE.REQUIRED },
    {
      pattern: REGEXS.upperCaseLetter,
      message: 'Пароль має містити принаймні одну велику латинську літеру',
    },
    {
      pattern: REGEXS.lowerCaseLetter,
      message: 'Пароль має містити принаймні одну малу латинську літеру',
    },
    {
      pattern: REGEXS.digit,
      message: 'Пароль має містити принаймні одну цифру',
    },
    {
      pattern: REGEXS.specialChars,
      message: 'Пароль має містити принаймні один спеціальний символ',
    },
    {
      min: 8,
      message: 'Довжина принаймі 8 символів',
    },
  ],
  PHONE_INPUT: {
    pattern: /^\d{9}$/,
  },
  VERIFICATION_CODE: {
    required: true,
    message: VALIDATION_MESSAGE.REQUIRED,
  },
};
