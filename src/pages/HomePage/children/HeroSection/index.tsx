import { Col, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as HeroImage } from 'src/assets/images/Group.svg';
import { TEXT } from 'src/config/constants';
import { Heading } from 'src/components/Heading';
import { Input } from 'src/components/Input';

import styles from './styles.module.scss';

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Row align="middle" justify="center" className={styles.heroSectionRow} wrap>
      <Col xs={{ span: 24, order: 1 }} md={{ span: 14, order: 0 }}>
        <Heading level={1} className={styles.heading}>
          {TEXT.HERO_SECTION_TITLE}
        </Heading>
        <p className={styles.paragraph}>{TEXT.HERO_SECTION_SUBTITLE}</p>
        <Input
          placeholder={TEXT.INPUT_SEARCH}
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onPressEnter={handleSearch}
        />
      </Col>
      <Col xs={{ span: 24, order: 0 }} md={{ span: 10, order: 1 }}>
        <HeroImage className={styles.image} />
      </Col>
    </Row>
  );
};
