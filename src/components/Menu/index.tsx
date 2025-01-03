import { Menu as AntMenu } from 'antd';
import { useNavigate } from 'react-router-dom';

import { TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

import styles from './styles.module.scss';

export const Menu = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  return (
    <AntMenu className={styles.avatarMenu}>
      <AntMenu.Item
        key="1"
        className={styles.dropdownButton}
        onClick={() => navigate(ROUTES.PUBLICATIONS)}
      >
        {TEXT.MY_PUBLICATIONS}
      </AntMenu.Item>
      <AntMenu.Item
        key="2"
        className={styles.dropdownButton}
        onClick={() => navigate(ROUTES.SETTINGS)}
      >
        {TEXT.SETTINGS}
      </AntMenu.Item>
      <AntMenu.Item
        key="3"
        className={styles.dropdownButton}
        onClick={() => authStore.signOut()}
      >
        {TEXT.LOGOUT}
      </AntMenu.Item>
    </AntMenu>
  );
};
