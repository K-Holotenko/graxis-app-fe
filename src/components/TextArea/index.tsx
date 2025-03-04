import { Input } from 'antd';

interface TextAreaProps {
  placeholder?: string;
  showCount?: boolean;
  autoSize?: { minRows: number; maxRows: number };
  maxLength?: number;
  rows?: number;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  placeholder,
  showCount = false,
  autoSize,
  maxLength,
  rows = 1,
  className,
  onChange,
}: TextAreaProps) => (
  <Input.TextArea
    placeholder={placeholder}
    showCount={showCount}
    maxLength={maxLength}
    rows={rows}
    autoSize={autoSize}
    className={className}
    onChange={onChange}
  />
);
