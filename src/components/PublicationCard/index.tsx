import { Card, Dropdown, MenuProps, Tooltip } from 'antd';
import { StarFilled, EyeOutlined, MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { theme } from 'src/config/theme';
import { PublicationCard as PublicationCardType } from 'src/services/PublicationService';
import { Button } from 'src/components/Button';
import { ROUTES } from 'src/router/routes';
import { ButtonTypes } from 'src/config/constants';

import styles from './styles.module.scss';
import { getDisplayPrice } from './utils/utils';

export interface PublicationCardProps {
  publicationCard: PublicationCardType;
  isEditable?: boolean;
}

export const menuItems = [
  {
    key: 1,
    label: 'Редагувати',
  },
  {
    key: 2,
    label: 'Переглянути історію',
  },
  {
    key: 3,
    label: 'Видалити',
  },
];

export const PublicationCard = ({
  publicationCard: { id, thumbnailUrl, title, rate, reviewCount, price },
  isEditable,
}: PublicationCardProps) => {
  const navigate = useNavigate();
  const displayPrice = getDisplayPrice(price);

  const textLength = 35;

  const handleCardClick = () => {
    navigate(`/item/${id}`);
  };

  const isTruncated = title.length > textLength;
  const truncatedTitle = isTruncated
    ? `${title.substring(0, textLength)}...`
    : title;
  const tooltip = isTruncated ? title : null;

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const actions: { [key: string]: () => void } = {
      1: () => navigate(ROUTES.NOT_FOUND),
      2: () => navigate(ROUTES.NOT_FOUND),
      3: () => navigate(ROUTES.NOT_FOUND),
    };

    actions[e.key]();
  };

  const menu = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  return (
    <Card
      className={styles.productCard}
      hoverable
      cover={
        <img src={thumbnailUrl} alt={title} className={styles.productImage} />
      }
      onClick={handleCardClick}
    >
      <div className={styles.infoBar}>
        <div className={styles.activity}>
          <div className={`${styles.iconWrapper} ${styles.marginRight}`}>
            <EyeOutlined className={styles.icon} />
            <span className={styles.activityValue}>
              {reviewCount.toFixed(1)}
            </span>
          </div>
          <div className={styles.iconWrapper}>
            <StarFilled className={styles.icon} />
            <span className={styles.activityValue}>{rate.toFixed(1)}</span>
          </div>
        </div>
        {isEditable && (
          <Dropdown
            menu={menu}
            placement="bottomRight"
            trigger={['click']}
            rootClassName={styles.dropdownRoot}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Button
                className={styles.editButton}
                icon={<MoreOutlined style={{ fontSize: 25 }} />}
                type={ButtonTypes.default}
              />
            </div>
          </Dropdown>
        )}
      </div>

      <Tooltip title={tooltip} color={theme.primary}>
        <p className={styles.cardTitle}>{truncatedTitle}</p>
      </Tooltip>
      <p className={styles.price}>
        {displayPrice?.value} грн / {displayPrice?.period}
      </p>
    </Card>
  );
};
