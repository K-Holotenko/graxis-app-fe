import { Avatar } from 'antd';

import { useUserStore } from 'src/stores/userStore';
import Star from 'src/assets/icons/star-icon.svg?react';
import Smiley from 'src/assets/icons/smiley-icon.svg?react';
import Circle from 'src/assets/icons/yellow-circle-icon.svg?react';

import styles from './styles.module.scss';

export const HeroBanner = () => {
  // TODO: change to use not the current user, but the user from the url
  const { user } = useUserStore();

  return (
    <div className={styles.heroBanner}>
      <Avatar
        size={{ xs: 100, sm: 100, md: 168, lg: 168, xl: 168, xxl: 168 }}
        src={user?.avatarUrl}
        className={styles.avatar}
      >
        {user?.name?.charAt(0)}
        {user?.surname?.charAt(0)}
      </Avatar>
      <div className={styles.location}>Локація</div>
      <div className={styles.name}>
        {user?.name} {user?.surname}
      </div>
      <div className={styles.lastTimeActive}>Last time active</div>
      <div className={styles.info}>
        <Star style={{ width: '27px', height: '25px' }} />
        <span className={styles.summary}>4.5</span>
        <Circle style={{ width: '16px', height: '16px', marginLeft: '12px' }} />
        <span className={styles.summary}>10 Відгуків</span>
      </div>
      <div className={styles.info}>
        <Smiley style={{ width: '24px', height: '24px' }} />
        <span className={styles.summary}>1.5 років з Graxis</span>
      </div>
    </div>
  );
};
