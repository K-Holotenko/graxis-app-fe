import { AddPublicationForm } from 'src/components/logic/Forms/AddPublicationForm';

import styles from './styles.module.scss';

export const AddPublication = () => (
  <section className={styles.section}>
    <h1 className={styles.header}>Додайте оголошення</h1>
    <AddPublicationForm />
  </section>
);
