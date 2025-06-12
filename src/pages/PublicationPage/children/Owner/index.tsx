import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { Heading } from 'src/components/Heading';
import Star from 'src/assets/icons/star-icon.svg?react';
import Smiley from 'src/assets/icons/smiley-icon.svg?react';
import { IMAGE_DESCRIPTION } from 'src/config/constants';
import { Publication } from 'src/services/PublicationService';
import { theme } from 'src/config/theme';

import styles from './styles.module.scss';
import { getTimeWithUs } from './utils/utils';

interface OwnerProps {
  ownerInfo: Publication['ownerInfo'];
}

export const Owner = ({
  ownerInfo: { id, name, surname, reviewCount, joinedAt, rate, avatarUrl },
}: OwnerProps) => (
  <div>
    <Heading level={4} className={styles.heading}>
      Про власника
    </Heading>
    <Link to={`/profile/${id}`} className={styles.infoWrap}>
      <Avatar
        style={{ backgroundColor: theme.primary }}
        size={{ xs: 82, sm: 98, md: 98, lg: 98, xl: 98, xxl: 98 }}
        src={avatarUrl?.length ? avatarUrl : undefined}
        alt={IMAGE_DESCRIPTION.USER_ICON}
        className={styles.avatar}
      >
        {name}
      </Avatar>
      <div>
        <p className={styles.name}>{`${name} ${surname}`}</p>
        <div className={styles.info}>
          <Star />
          <span className={styles.text}>{rate}</span>
          <span className={styles.text}>{reviewCount} відгуків</span>
        </div>
        <div className={styles.info}>
          <Smiley />
          <span className={styles.text}>
            {getTimeWithUs(joinedAt)} з Graxis
          </span>
        </div>
      </div>
    </Link>
  </div>
);
