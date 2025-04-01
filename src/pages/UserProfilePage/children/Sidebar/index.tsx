import { ConfigProvider, Menu } from 'antd';

import styles from './styles.module.scss';

const items = [
  {
    key: 'profile',
    label: 'Профіль',
  },
  {
    key: 'notifications',
    label: 'Повідомлення',
  },
  {
    key: 'payment',
    label: 'Платіжна інформація',
  },
  {
    key: 'policy',
    label: 'Політика конфіденційності',
  },
  {
    key: 'faq',
    label: 'Питання та відповіді',
  },
];

export const Sidebar = () => (
  <div className={styles.sidebarContainer}>
    <ConfigProvider theme={localTheme}>
      <Menu className={styles.menu} mode="vertical" items={items} />
    </ConfigProvider>
  </div>
);

const localTheme = {
  components: {
    Menu: {
      colorSplit: 'white',
    },
  },
};
