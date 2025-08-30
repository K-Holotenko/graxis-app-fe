import { useState } from 'react';
import { Card, Dropdown, MenuProps } from 'antd';
import { EyeOutlined, MoreOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate, generatePath } from 'react-router-dom';

import { deletePublicationById } from 'src/services/PublicationService';
import { PublicationCard as PublicationCardType } from 'src/types';
import { Button } from 'src/components/Button';
import { ROUTES } from 'src/router/routes';
import { ButtonTypes } from 'src/config/constants';
import { VALIDATION_MESSAGE } from 'src/config/validation';
import { DeleteModal } from 'src/pages/MyPublicationsPage/children/DeleteModal';
import { NotificationType, useNotification } from 'src/hooks/useNotification';

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

  const { openNotification } = useNotification();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const displayPrice = getDisplayPrice(price);

  const handleCardClick = () => {
    const path = generatePath(ROUTES.PUBLICATION, { id });

    navigate(path);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    e.domEvent.stopPropagation();
    const actions: { [key: string]: () => void } = {
      1: () => navigate(ROUTES.NOT_FOUND),
      2: () => navigate(ROUTES.NOT_FOUND),
      3: () => setIsDeleteModalOpen(true),
    };

    actions[e.key]();
  };

  const menu = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  //TODO This function should be extracted to the page level, when publications are present
  const handleDelete = () => {
    deletePublicationById(id)
      .then(() => {
        openNotification(
          NotificationType.SUCCESS,
          'Готово',
          'Публікацію видалено'
        );
      })
      .catch(() => {
        openNotification(
          NotificationType.ERROR,
          VALIDATION_MESSAGE.ERROR,
          'Не вдалося видалити публікацію'
        );
      })
      .finally(() => {
        setIsDeleteModalOpen(false);
      });
  };

  return (
    <>
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
                {reviewCount?.toFixed(1) || 0}
              </span>
            </div>
            <div className={styles.iconWrapper}>
              <StarOutlined className={styles.icon} />
              <span className={styles.activityValue}>
                {rate?.toFixed(1) || 0}
              </span>
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
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.price}>
          {displayPrice?.value} грн / {displayPrice?.period}
        </p>
      </Card>

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};
