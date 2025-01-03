import styles from './styles.module.scss';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({ level, children, className }: HeadingProps) => {
  const HeadingTag: React.ElementType = `h${level}`;

  return (
    <HeadingTag className={`${styles['h' + level]} ${className}`}>
      {children}
    </HeadingTag>
  );
};
