import { Avatar } from 'antd';

import Star from 'src/assets/icons/star-icon.svg?react';
import Smiley from 'src/assets/icons/smiley-icon.svg?react';
import Circle from 'src/assets/icons/yellow-circle-icon.svg?react';
import { useUserProfileStore } from 'src/stores/userProfileStore';
import {
  formatLastActiveTime,
  formatRegistrationDate,
} from 'src/utils/formatDate';
import { theme } from 'src/config/theme';

import styles from './styles.module.scss';

export const HeroBanner = () => {
  const { profile } = useUserProfileStore();

  return (
    <div className={styles.heroBanner}>
      <Avatar
        size={{ xs: 100, sm: 100, md: 168, lg: 168, xl: 168, xxl: 168 }}
        src={profile?.author.avatarUrl}
        className={styles.avatar}
      >
        {profile?.author.name?.charAt(0)}
        {profile?.author.surname?.charAt(0)}
      </Avatar>
      <div className={styles.location}>
        {profile?.author.location?.country} {profile?.author.location?.city}
      </div>
      <div className={styles.name}>
        {profile?.author.name} {profile?.author.surname}
      </div>
      <div className={styles.lastTimeActive}>
        {formatLastActiveTime(profile?.author.activeAt ?? '')}
      </div>
      <div className={styles.info}>
        <Star style={{ width: '27px', height: '25px' }} />
        <span className={styles.summary}>{profile?.author.rate || 0}</span>
        <Circle
          style={{ width: '16px', height: '16px', marginLeft: theme.space150 }}
        />
        <span className={styles.summary}>
          {profile?.author.reviewCount || 0} Відгуків
        </span>
      </div>
      <div className={styles.info}>
        <Smiley style={{ width: '24px', height: '24px' }} />
        <span className={styles.summary}>
          {formatRegistrationDate(profile?.author.registrationDate ?? '')} з
          Graxis
        </span>
      </div>
    </div>
  );
};
