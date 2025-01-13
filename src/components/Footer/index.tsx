import { Col, ConfigProvider, Image, Row, Typography } from 'antd';

import {
  APP_CONTACT_DATA,
  SOCIAL_MEDIA_LIST,
  TEXT,
} from 'src/config/constants';
import { theme } from 'src/config/theme';
import { Logo } from 'src/components/Logo';
import { ReactComponent as FooterImg } from 'src/assets/images/Footer.svg';

import styles from './styles.module.scss';

const { Link, Text } = Typography;

export const Footer = () => (
  <footer className={`container ${styles.footer}`}>
    <ConfigProvider theme={localTheme}>
      <Row className={styles.footerRow}>
        <Col xs={24} lg={6} className={styles.logo}>
          <Logo height={28} />
        </Col>
        <Col xs={24} md={7} lg={{ span: 8 }} className={styles.footerCol}>
          <Text className={styles.title}>{TEXT.FAST_LINKS}</Text>
          <Link href="" className={styles.link}>
            {TEXT.CATEGORIES}
          </Link>
          <Link href="" className={styles.link}>
            {TEXT.POPULAR_NOW}
          </Link>
          <Link href="" className={styles.link}>
            {TEXT.FEEDBACKS}
          </Link>
        </Col>
        <Col
          xs={24}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 0 }}
          className={styles.footerCol}
        >
          <Text className={styles.title}>{TEXT.CONTACT_US}</Text>
          <div className={styles.footerEmailBlock}>
            <Text>{TEXT.EMAIL}:</Text>
            <Link className={styles.link}>{APP_CONTACT_DATA.email}</Link>
          </div>
          <Text className={styles.link}>
            {TEXT.PHONE}:{' '}
            <Link className={styles.link}>{APP_CONTACT_DATA.phone}</Link>
          </Text>
          <div className={styles.footerMediaSection}>
            {SOCIAL_MEDIA_LIST.map(({ key, icon, href }) => (
              <Link key={key} href={href} target="_blank">
                <Image src={icon} preview={false} />
              </Link>
            ))}
          </div>
        </Col>
      </Row>
    </ConfigProvider>
    <Row>
      <Col span={24} className={styles.footerRights}>
        {TEXT.RIGHTS}
      </Col>
    </Row>
    <FooterImg className={styles.footerImg} />
  </footer>
);

const localTheme = {
  token: {
    colorText: theme.primaryColor,
    colorLink: theme.primaryColor,
  },
};
