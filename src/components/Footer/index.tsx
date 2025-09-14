import { Col, ConfigProvider, Image, Row, Typography } from 'antd';

import { APP_CONTACT_DATA, SOCIAL_MEDIA_LIST } from 'src/config/constants';
import { theme } from 'src/config/theme';
import { Logo } from 'src/components/Logo';
import FooterImg from 'src/assets/images/Footer.svg?react';

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
          <Text className={styles.title}>Швидкі посилання</Text>
          <Link href="" className={styles.link}>
            Категорії
          </Link>
          <Link href="" className={styles.link}>
            Популярне зараз
          </Link>
          <Link href="" className={styles.link}>
            Відгуки
          </Link>
        </Col>
        <Col
          xs={24}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 0 }}
          className={styles.footerCol}
        >
          <Text className={styles.title}>Звʼяжіться з нами</Text>
          <div className={styles.footerEmailBlock}>
            <Text>Email:</Text>
            <Link className={styles.link}>{APP_CONTACT_DATA.email}</Link>
          </div>
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
        © 2025 Graxis. Всі права захищено. Політика конфіденційності
      </Col>
    </Row>
    <FooterImg className={styles.footerImg} />
  </footer>
);

const localTheme = {
  token: {
    colorText: theme.primary,
    colorLink: theme.primary,
  },
};
