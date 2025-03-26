import { Tooltip } from 'antd';

import { Heading } from 'src/components/Heading';
import Star from 'src/assets/icons/star-icon.svg?react';
import Circle from 'src/assets/icons/yellow-circle-icon.svg?react';
import { SCREEN_WIDTH, TEXT } from 'src/config/constants';
import { theme } from 'src/config/theme';
import { useWindowSize } from 'src/hooks/useWindowSize';

import styles from './styles.module.scss';

interface ProductData {
  title: string;
  category: string;
  rate: number;
  feedbackCount: number;
}

export const PublicationName = ({
  title,
  category,
  rate,
  feedbackCount,
}: ProductData) => {
  const { width } = useWindowSize();

  const isDesktop = width > SCREEN_WIDTH.XL;
  const textLimit = 46;

  const isTruncated = title.length > textLimit && isDesktop;
  const tooltip = isTruncated ? title : null;

  const truncatedTitle = isTruncated
    ? `${title.slice(0, textLimit)}...`
    : title;

  return (
    <section className={styles.itemNameWrapper}>
      <Heading level={2} className={styles.itemName}>
        <Tooltip title={tooltip} placement="bottomLeft" color={theme.primary}>
          {truncatedTitle}
        </Tooltip>
      </Heading>
      <p className={styles.category}>{category}</p>
      <div className={styles.descriptionWrapper}>
        <div className={styles.description}>
          <Star />
          <span className={styles.rate}>{rate}</span>
        </div>
        <div className={styles.description}>
          <Circle />
          <span className={styles.feedback}>
            {feedbackCount} {TEXT.FEEDBACK_AMOUNT}
          </span>
        </div>
      </div>
    </section>
  );
};
