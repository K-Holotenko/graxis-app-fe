import React from 'react';
import { Checkbox } from 'antd';
import styles from './CheckboxComponent.module.scss';
import { auth } from '../../constants/auth/auth';

export const CheckboxComponent: React.FC = () => (
  <Checkbox className={styles.checkbox}>{auth.checkboxLabel}</Checkbox>
);
