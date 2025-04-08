import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

export const AppLoadingPage = () => (
  <main className={styles.page}>
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: 56, color: '#003342' }} spin />
      }
    />
  </main>
);
