import styles from './styles.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  isChat?: boolean;
}

export const Container = ({ children, isChat }: ContainerProps) => (
  <section
    className={`${styles.container} ${isChat ? styles.chatContainer : ''}`}
  >
    {children}
  </section>
);
