import { Button } from 'src/components/Button';
import { ButtonTypes } from 'src/config/constants';

interface LoadMoreProps {
  loadMore: () => Promise<void>;
  isLoading: boolean;
}

export const LoadMore = ({ loadMore, isLoading }: LoadMoreProps) => (
  <Button
    label={isLoading ? undefined : 'Показати більше'}
    type={ButtonTypes.primary}
    onClick={loadMore}
    isDisabled={isLoading}
    isLoading={isLoading}
  />
);
