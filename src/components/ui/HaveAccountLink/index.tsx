import { Link } from 'react-router-dom';

import { TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';

import styles from './styles.module.scss';

// TODO this comopnent is the same as NoAccountLink we can merge them
export const HaveAccountLink = () => (
  <span>
    {TEXT.ALREADY_HAVE_ACCOUNT}{' '}
    <Link to={ROUTES.LOGIN} className={styles.authorizeStyle}>
      {TEXT.AUTHORIZE}
    </Link>
  </span>
);
