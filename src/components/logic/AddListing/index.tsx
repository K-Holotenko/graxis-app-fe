import { AddListingForm } from 'src/components/logic/Forms/AddListingForm';

import styles from './styles.module.scss';

export const AddListing = () => (
  <section className={styles.addListingSection}>
    <h1 className={styles.addListingHeader}>Додайте оголошення</h1>
    <AddListingForm />
  </section>
);
