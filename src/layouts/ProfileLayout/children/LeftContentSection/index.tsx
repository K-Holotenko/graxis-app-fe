import { Col } from 'antd';
import { useSearchParams } from 'react-router-dom';

import { PROFILE_PARAMS } from 'src/config/constants';

import styles from './styles.module.scss';

interface LeftContentSectionProps {
  span: number;
  leftContent: React.ReactNode;
}

export const LeftContentSection = ({
  span,
  leftContent,
}: LeftContentSectionProps) => {
  const [, setSearchParams] = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams();

    params.set('p', PROFILE_PARAMS.PROFILE);
    setSearchParams(params, { preventScrollReset: true });
  };

  return (
    <Col
      span={span}
      className={styles.leftContentSection}
      onClick={handleClick}
    >
      {leftContent}
    </Col>
  );
};
