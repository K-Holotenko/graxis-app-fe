import { Col, ConfigProvider, Image, Row, Typography } from 'antd';

import {
  APP_CONTACT_DATA,
  SOCIAL_MEDIA_LIST,
  TEXT,
} from 'src/config/constants';
import { theme } from 'src/config/theme';
import { Logo } from 'src/components/ui/Logo';

import styles from './styles.module.scss';

const { Link, Text } = Typography;

export const AppFooter = () => (
  <section className={styles.appFooterSection}>
    <div className="container">
      <ConfigProvider
        theme={{
          token: {
            colorText: theme.primaryColor,
            colorLink: theme.primaryColor,
          },
        }}
      >
        <Row className={styles.footerRow}>
          <Col span={24} xl={{ span: 10 }} className={styles.footerColLogo}>
            <Logo />
          </Col>
          <Col
            span={12}
            xl={{ span: 7 }}
            xs={{ span: 24 }}
            className={styles.footerCol}
          >
            <Text className={styles.title}>{TEXT.FAST_LINKS}</Text>
            <Link>{TEXT.CATEGORIES}</Link>
            <Link>{TEXT.POPULAR_NOW}</Link>
            <Link>{TEXT.FEEDBACKS}</Link>
          </Col>
          <Col
            span={12}
            xl={{ span: 7 }}
            xs={{ span: 24 }}
            className={styles.footerCol}
          >
            <Text className={styles.title}>{TEXT.CONTACT_US}</Text>
            <div className={styles.footerEmailBlock}>
              <Text>{TEXT.EMAIL}:</Text>
              <Link>{APP_CONTACT_DATA.email}</Link>
            </div>
            <Text>
              {TEXT.PHONE}: <Link>{APP_CONTACT_DATA.phone}</Link>
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
    </div>
  </section>
);
