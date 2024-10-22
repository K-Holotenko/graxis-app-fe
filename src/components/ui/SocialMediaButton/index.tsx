import React from 'react';
import { Button } from 'antd';

import './styles.scss';

interface SocialMediaButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const SocialMediaButton = ({
  icon,
  onClick,
  className = 'social-media-button',
}: SocialMediaButtonProps) => (
  <Button block className={className} icon={icon} onClick={onClick} />
);
