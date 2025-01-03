import { Checkbox as AntCheckbox } from 'antd';

interface CheckboxProps {
  label: string;
}
export const Checkbox = ({ label }: CheckboxProps) => (
  <AntCheckbox>{label}</AntCheckbox>
);
