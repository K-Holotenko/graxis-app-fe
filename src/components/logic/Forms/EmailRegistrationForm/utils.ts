import { VALIDATION_CONDITION } from 'config/validation';

export const CREATE_PASSWORD_VALIDATION_CONDITIONS = [
  VALIDATION_CONDITION.REQUIRED,
  {
    pattern: /[A-Z]/,
    message: 'Пароль має містити принаймні одну велику літеру',
  },
  {
    pattern: /[a-z]/,
    message: 'Пароль має містити принаймні одну малу літеру',
  },
  {
    pattern: /\d/,
    message: 'Пароль має містити принаймні одну цифру',
  },
  {
    pattern: /[\W_]/,
    message: 'Пароль має містити принаймні один спеціальний символ',
  },
  {
    min: 8,
    message: 'Довжина принаймі 8 символів',
  },
];
