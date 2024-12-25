import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as GoogleIcon } from 'src/assets/icons/google-icon.svg';
import { SocialMediaButton } from 'src/components/ui/SocialMediaButton';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

export const SocialMediaSection = () => {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuthStore();

  const onGoogleClick = async () => {
    await loginWithGoogle();
    navigate(ROUTES.HOME);
  };

  return (
    <Row justify="space-between" className="mb-34 mt-34" gutter={40}>
      <Col span={14} offset={5}>
        <SocialMediaButton icon={<GoogleIcon />} onClick={onGoogleClick} />
      </Col>
    </Row>
  );
};
