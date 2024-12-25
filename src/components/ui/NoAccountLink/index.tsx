import { Link } from 'react-router-dom';

import { TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';

import styles from './styles.module.scss';

// TODO this comopnent is the same as HaveAccountLink we can merge them
export const NoAccountLink = () => (
  <span>
    {TEXT.NO_ACCOUNT}{' '}
    <Link to={ROUTES.REGISTRATION} className={styles.registerStyle}>
      {TEXT.REGISTER}
    </Link>
  </span>
);
