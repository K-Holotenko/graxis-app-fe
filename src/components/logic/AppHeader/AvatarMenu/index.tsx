import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

import styles from './styles.module.scss';

export const AvatarMenu = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  return (
    <Menu className={styles.avatarMenu}>
      <Menu.Item
        key="1"
        className={styles.dropdownButton}
        onClick={() => navigate(ROUTES.PUBLICATIONS)}
      >
        {TEXT.MY_PUBLICATIONS}
      </Menu.Item>
      <Menu.Item
        key="2"
        className={styles.dropdownButton}
        onClick={() => navigate(ROUTES.SETTINGS)}
      >
        {TEXT.SETTINGS}
      </Menu.Item>
      <Menu.Item
        key="3"
        className={styles.dropdownButton}
        onClick={() => authStore.signOut()}
      >
        {TEXT.LOGOUT}
      </Menu.Item>
    </Menu>
  );
};
