import { REGEXS } from 'src/config/constants';
import { VALIDATION_CONDITION } from 'src/config/validation';

export const CREATE_PASSWORD_VALIDATION_CONDITIONS = [
  VALIDATION_CONDITION.REQUIRED,
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
];
