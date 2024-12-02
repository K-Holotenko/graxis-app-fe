import imageSrc from 'src/assets/images/man-on-bike.jpg';

export const VERIFY_EMAIL_PAGE_CONSTANTS = {
  PAGE_TITLE: 'Email Verification',
  IMAGE_SRC: imageSrc,

  MAIN_MESSAGE: (email: string) => ({
    firstPartMes: `На вашу електронну пошту `,
    emailText: email,
    secondPartMes: ` відправлено лист. Перейдіть за посиланням в листі для підтвердження вашої пошти.
     Посилання доступне годину.`,
  }),
};
