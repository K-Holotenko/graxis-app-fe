import { Typography } from 'antd';

import { TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';

import styles from './styles.module.scss';

export const NoAccountLink = () => (
  <Typography>
    {TEXT.NO_ACCOUNT}
    <Typography.Link
      href={ROUTES.REGISTRATION}
      className={styles.registerStyle}
    >
      {TEXT.REGISTER}
    </Typography.Link>
  </Typography>
);
