import logoSrc from 'src/assets/images/Logo.svg';
import { IMAGE_DESCRIPTION } from 'src/config/constants';

interface LogoProps {
  className?: string;
  height?: number;
}

export const Logo = ({ className, height }: LogoProps) => (
  <img
    src={logoSrc}
    alt={IMAGE_DESCRIPTION.LOGO}
    className={`logo ${className}`}
    height={height}
  />
);
