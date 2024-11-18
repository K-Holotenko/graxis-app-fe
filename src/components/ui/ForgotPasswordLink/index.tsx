import { Typography } from 'antd';

import { TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';

export const ForgotPasswordLink = () => (
  <Typography.Link href={ROUTES.LOGIN}>{TEXT.FORGOT_PASSWORD}</Typography.Link>
);
