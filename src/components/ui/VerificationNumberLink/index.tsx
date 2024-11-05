import { Image, Typography } from 'antd';
import { REGISTRATION_PAGE_CONSTANTS } from 'pages/RegistrationPage/utils/constants';
import { ROUTES } from 'router/routes';
import EditSrc from 'assets/icons/edit-icon.svg';

export const VerificationNumberLink = () => {
  const phone = sessionStorage.getItem('phone');

  return (
    <Typography.Link
      href={`${ROUTES.REGISTRATION}?tab=${REGISTRATION_PAGE_CONSTANTS.FORM.PHONE_TAB.KEY}`}
    >
      {phone}
      <Image src={EditSrc} alt="Logo" preview={false} />
    </Typography.Link>
  );
};
