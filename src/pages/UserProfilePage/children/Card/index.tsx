import styles from './styles.module.scss';

interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => (
  <div className={styles.card}>{children}</div>
);
