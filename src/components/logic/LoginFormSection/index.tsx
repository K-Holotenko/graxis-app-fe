import { Button, Flex, Tabs, Typography } from 'antd';
import { LOGIN_PAGE_CONSTANTS } from '../../../pages/LoginPage/utils/constants';

const { Title } = Typography;

export const LoginFormSection = () => {
  const onContinueClick = () => {};

  return (
    <Flex vertical justify="center">
      <Title level={2}>{LOGIN_PAGE_CONSTANTS.FORM.TITLE}</Title>
      <Tabs
        defaultActiveKey={LOGIN_PAGE_CONSTANTS.FORM.EMAIL_TAB.KEY}
        centered
        items={[
          {
            label: LOGIN_PAGE_CONSTANTS.FORM.EMAIL_TAB.TITLE,
            key: LOGIN_PAGE_CONSTANTS.FORM.EMAIL_TAB.KEY,
            children: 'Tab 1',
          },
          {
            label: LOGIN_PAGE_CONSTANTS.FORM.PHONE_TAB.TITLE,
            key: LOGIN_PAGE_CONSTANTS.FORM.PHONE_TAB.KEY,
            children: 'Tab 2',
          },
        ]}
      />
      <Button type="primary" onClick={onContinueClick}>
        Button
      </Button>
    </Flex>
  );
};
