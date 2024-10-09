import React from 'react';
import { Button } from 'antd';

import './styles.scss';

interface ISocialMediaButtonParams {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const SocialMediaButton: React.FC<ISocialMediaButtonParams> = ({
  icon,
  onClick,
  className = 'social-media-button',
}) => {
  return <Button block className={className} icon={icon} onClick={onClick} />;
};

export default SocialMediaButton;
