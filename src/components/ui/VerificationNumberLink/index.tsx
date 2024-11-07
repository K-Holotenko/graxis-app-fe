import { Image, Typography } from 'antd';
import { ROUTES } from 'router/routes';
import EditSrc from 'assets/icons/edit-icon.svg';

export const VerificationNumberLink = () => {
  const phone = sessionStorage.getItem('phone');

  return (
    <Typography.Link href={`${ROUTES.REGISTRATION}`}>
      {phone}
      <Image src={EditSrc} alt="Edit" preview={false} />
    </Typography.Link>
  );
};
