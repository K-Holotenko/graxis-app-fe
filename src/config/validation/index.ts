export const VALIDATION_MESSAGE = {
  ALREADY_REGISTERED_EMAIL: 'Дана електрона пошта уже зареєстрована',

  CONFIRMATION_PASSWORD: 'Паролі не співпадають',

  INVALID_PHONE:
    'Данний номер телефону уже зареєстрованно або цей номер не є дійсним',
  INVALID_PASSWORD:
    'Пароль може мати букви латиниці, цифри та спеціальні символи',

  NOT_REGISTERED_PHONE: 'Данний номер не зареєстровано',

  REQUIRED: 'Заповніть поле!',
};

export const VALIDATION_CONDITION = {
  REQUIRED: { required: true, message: VALIDATION_MESSAGE.REQUIRED },
};
