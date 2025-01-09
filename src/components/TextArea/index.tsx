import { Input } from 'antd';

interface TextAreaProps {
  placeholder?: string;
  showCount?: boolean;
  maxLength?: number;
  rows?: number;
}

export const TextArea = ({
  placeholder,
  showCount = false,
  maxLength,
  rows = 1,
}: TextAreaProps) => (
  <Input.TextArea
    placeholder={placeholder}
    showCount={showCount}
    maxLength={maxLength}
    rows={rows}
    autoSize={{ minRows: rows, maxRows: rows }}
  />
);
