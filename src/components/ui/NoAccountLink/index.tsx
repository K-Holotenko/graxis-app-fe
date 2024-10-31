import { Typography } from 'antd';

import { TEXT } from '../../../config/constants';
import { ROUTES } from '../../../router/routes';

export const NoAccountLink = () => (
  <Typography>
    {TEXT.NO_ACCOUNT}
    <Typography.Link href={ROUTES.REGISTRATION}>
      {TEXT.REGISTER}
    </Typography.Link>
  </Typography>
);
