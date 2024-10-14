import { Checkbox } from 'antd';
import { auth } from '../../config/auth/auth';
import styles from './CheckboxComponent.module.scss';

export const CheckboxComponent = () => (
  <Checkbox className={styles.checkbox}>{auth.checkboxLabel}</Checkbox>
);
