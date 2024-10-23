import { Row, Typography, Image, Col, Button, Space } from 'antd';
import { PageContainer } from '../../components/ui/PageContainer';
import { AuthLayout } from '../../layouts/AuthLayout';
import { EMAIL_VERIFIED_PAGE_CONSTANTS } from './utils/constants';
import { TEXT } from '../../config/constants';

const { Title } = Typography;

export const EmailVerifiedPage = () => (
  <PageContainer pageTitle={EMAIL_VERIFIED_PAGE_CONSTANTS.PAGE_TITLE}>
    <AuthLayout imageSrc={EMAIL_VERIFIED_PAGE_CONSTANTS.IMAGE_SRC}>
      <Row justify="center" className="mt-200">
        <Col span={24}>
          <Space direction="vertical">
            <Title level={3} className="centered">
              {EMAIL_VERIFIED_PAGE_CONSTANTS.SUCCESS_MESSAGE}
            </Title>

            <Row justify="center">
              <Image
                src={EMAIL_VERIFIED_PAGE_CONSTANTS.ICON_SRC}
                alt="Success check icon"
                preview={false}
              />
            </Row>

            <Typography className="centered">
              {EMAIL_VERIFIED_PAGE_CONSTANTS.THANKS_MESSAGE}
            </Typography>

            <Button type="primary" className="w100 mt-20">
              {TEXT.SUBMIT}
            </Button>
          </Space>
        </Col>
      </Row>
    </AuthLayout>
  </PageContainer>
);
