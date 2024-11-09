import imageSrc from '../../../assets/images/man-on-bike.jpg';

export const VERIFY_EMAIL_PAGE_CONSTANTS = {
  PAGE_TITLE: 'Email Verification',
  IMAGE_SRC: imageSrc,

  MAIN_MESSAGE: (email: string) =>
    `На вашу електронну пошту ${email} відправлено лист. Перейдіть за посиланням в листі для підтвердження вашої пошти. 
  Посилання доступне годину.`,
};
