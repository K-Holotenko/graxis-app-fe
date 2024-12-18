import { Typography } from 'antd';

import { TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';

import styles from './styles.module.scss';

export const HaveAccountLink = () => (
  <Typography>
    {TEXT.ALREADY_HAVE_ACCOUNT}
    <Typography.Link href={ROUTES.LOGIN} className={styles.authorizeStyle}>
      {TEXT.AUTHORIZE}
    </Typography.Link>
  </Typography>
);
