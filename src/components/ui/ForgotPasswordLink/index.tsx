import { Link } from 'react-router-dom';

import { TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';

import styles from './styles.module.scss';

export const ForgotPasswordLink = () => (
  <Link to={ROUTES.LOGIN} className={styles.link}>
    {TEXT.FORGOT_PASSWORD}
  </Link>
);
