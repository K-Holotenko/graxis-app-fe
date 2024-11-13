export const VALIDATION_MESSAGE = {
  ALREADY_REGISTERED_EMAIL: 'Ця електрона пошта вже зареєстрована',
  AUTH_MESSAGE_ERROR: 'Виникла помилка. Спробуйте ще раз',

  CODE_VERIFY_ERR: 'Невірний код верифікації',

  CONFIRMATION_PASSWORD: 'Паролі не співпадають',
  EMAIL: 'Дотримуйтесь шаблону: youremail@gmail.com',
  INVALID_PHONE:
    'Данний номер телефону вже зареєстрованно або цей номер не є дійсним',
  INVALID_PASSWORD:
    'Пароль може мати букви латиниці, цифри та спеціальні символи',

  NOT_REGISTERED_PHONE: 'Данний номер не зареєстровано',
  PASSWORD:
    'Пароль може містити тільки літери, цифри та спеціальні символи (A, p, #, 4)та бути не менше 8 символів',
  REQUIRED: 'Заповніть поле!',
};

export const VALIDATION_CONDITION = {
  REQUIRED: { required: true, message: VALIDATION_MESSAGE.REQUIRED },
  EMAIL: {
    required: true,
    message: VALIDATION_MESSAGE.EMAIL,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    required: true,
    message: VALIDATION_MESSAGE.PASSWORD,
    pattern: /^[A-Za-z0-9#]{8,}$/,
  },
  PHONE_INPUT: {
    pattern: /^\d{9}$/,
  },
  VERIFICATION_CODE: {
    pattern: /\D/g,
  },
};
