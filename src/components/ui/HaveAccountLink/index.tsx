import { Typography } from 'antd';

import { TEXT } from '../../../config/constants';
import { ROUTES } from '../../../router/routes';

export const HaveAccountLink = () => (
  <Typography>
    {TEXT.ALREADY_HAVE_ACCOUNT}
    <Typography.Link href={ROUTES.LOGIN}>{TEXT.AUTHORIZE}</Typography.Link>
  </Typography>
);
