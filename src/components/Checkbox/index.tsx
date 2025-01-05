import { Checkbox as AntCheckbox } from 'antd';

interface CheckboxProps {
  label: string;
  onChange?: () => void;
}
export const Checkbox = ({ label, onChange }: CheckboxProps) => (
  <AntCheckbox onChange={onChange}>{label}</AntCheckbox>
);
