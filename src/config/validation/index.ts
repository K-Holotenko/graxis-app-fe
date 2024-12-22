export const VALIDATION_MESSAGE = {
  ALREADY_REGISTERED_EMAIL: 'Ця електронна пошта вже зареєстрована',
  AUTH_MESSAGE_ERROR: 'Виникла помилка. Спробуйте ще раз',

  CODE_VERIFY_ERR: 'Невірний код верифікації',

  CONFIRMATION_PASSWORD: 'Паролі не співпадають',
  EMAIL: 'Дотримуйтесь шаблону: youremail@gmail.com',
  INVALID_PHONE:
    'Данний номер телефону вже зареєстрованно або цей номер не є дійсним',

  NOT_REGISTERED_PHONE: 'Данний номер не зареєстровано',
  REQUIRED: 'Заповніть поле!',
};

export const VALIDATION_CONDITION = {
  REQUIRED: { required: true, message: VALIDATION_MESSAGE.REQUIRED },
  EMAIL: {
    required: true,
    message: VALIDATION_MESSAGE.EMAIL,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE_INPUT: {
    pattern: /^\d{9}$/,
  },
  VERIFICATION_CODE: {
    pattern: /\D/g,
  },
};
