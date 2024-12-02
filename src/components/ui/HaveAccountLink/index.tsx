import { Typography } from 'antd';

import { TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';

export const HaveAccountLink = () => (
  <Typography>
    {TEXT.ALREADY_HAVE_ACCOUNT}
    <Typography.Link href={ROUTES.LOGIN}>{TEXT.AUTHORIZE}</Typography.Link>
  </Typography>
);
