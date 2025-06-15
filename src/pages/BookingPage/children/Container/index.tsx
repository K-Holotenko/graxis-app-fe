import styles from './styles.module.scss';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => (
  <section className={styles.container}>{children}</section>
);
