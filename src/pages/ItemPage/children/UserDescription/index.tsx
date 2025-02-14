import { useState } from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { Heading } from 'src/components/Heading';
import { ReactComponent as Star } from 'src/assets/icons/star-icon.svg';
import { ReactComponent as Smiley } from 'src/assets/icons/smiley-icon.svg';
import userAvatar from 'src/assets/images/user-avatar.jpg';
import { IMAGE_DESCRIPTION, SCREEN_WIDTH, TEXT } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';

import styles from './styles.module.scss';

const MAX_TEXT_LENGTH = 500;

export const UserDescription = () => {
  const { width } = useWindowSize();
  const [isExpanded, setIsExpanded] = useState(false);

  const descriptionText = TEXT.DESCRIPTION_TEXT;

  const showShortText =
    width < SCREEN_WIDTH.SM && descriptionText.length > MAX_TEXT_LENGTH;
  const displayedText =
    showShortText && !isExpanded
      ? `${descriptionText.slice(0, MAX_TEXT_LENGTH)}...`
      : descriptionText;

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <Heading level={4} className={styles.heading}>
          {TEXT.DESCRIPTION}
        </Heading>
        <p className={styles.description}>{displayedText}</p>
        {showShortText && (
          <button
            className={styles.moreButton}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? TEXT.LESS : TEXT.MORE}
          </button>
        )}
      </div>
      <div>
        <Heading level={4} className={styles.heading}>
          {TEXT.ABOUT_USER}
        </Heading>
        <Link to="/user/:id" className={styles.infoWrap}>
          <Avatar
            size={{ xs: 82, sm: 98, md: 98, lg: 98, xl: 98, xxl: 98 }}
            src={userAvatar}
            alt={IMAGE_DESCRIPTION.USER_ICON}
            className={styles.avatar}
          />
          <div>
            <p className={styles.name}>{TEXT.USER_NAME}</p>
            <div className={styles.info}>
              <Star />
              <span className={styles.text}>4,5</span>
              <span className={styles.text}>12 {TEXT.FEEDBACK_AMOUNT}</span>
            </div>
            <div className={styles.info}>
              <Smiley />
              <span className={styles.text}>2 {TEXT.WITH_US}</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};
