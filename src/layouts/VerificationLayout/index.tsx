import { Row, Space, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { VERIFICATION_PAGE_CONSTANTS } from 'pages/VerificationPage/utils/constants';
import { VerificationNumberLink } from 'components/ui/VerificationNumberLink';
import { VerificationForm } from 'components/logic/Forms/VerificationForm';
import { TEXT } from 'config/constants';
import './styles.scss';

export const VerificationLayout = () => (
  <Row className="verif-code-row" align="middle">
    <Space
      direction="vertical"
      align="center"
      size={0}
      className="verif-code-space"
    >
      <Title level={2}>{VERIFICATION_PAGE_CONSTANTS.TITLE}</Title>
      <Typography className="verif-code-text">{TEXT.SENT_SMS}</Typography>
      <VerificationForm />
      <VerificationNumberLink />
    </Space>
  </Row>
);
