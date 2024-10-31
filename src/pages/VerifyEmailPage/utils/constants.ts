import imageSrc from '../../../assets/images/man-on-bike.jpg';
import iconSrc from '../../../assets/icons/success-check-circle.png';

export const VERIFY_EMAIL_PAGE_CONSTANTS = {
  PAGE_TITLE: 'Email Verification',
  IMAGE_SRC: imageSrc,
  ICON_SRC: iconSrc,
  FORM: {
    TITLE: 'Підтвердження Email',
  },
  MAIN_MESSAGE: (email: string) =>
    `На вашу електронну пошту ${email} відправлено лист. Перейдіть за посиланням в листі для підтвердження вашої пошти. 
  Посилання доступне годину.`,
  SUCCESS_MESSAGE: 'Пошту успішно підтверджено',
};
