import { Row, Space, Typography } from 'antd';
import Title from 'antd/es/typography/Title';

import { VerificationForm } from 'src/components/logic/Forms/VerificationForm';
import { VerificationNumberLink } from 'src/components/ui/VerificationNumberLink';
import { TEXT } from 'src/config/constants';
import { VERIFICATION_PAGE_CONSTANTS } from 'src/pages/VerificationPage/utils/constants';
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
