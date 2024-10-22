import { Button } from 'antd';
import { PageContainer } from '../../components/ui/PageContainer';
import { useAuthStore } from '../../stores/authStore';
import { HOME_PAGE_CONSTANTS } from './utils/constants';

export const HomePage = () => {
  const { signOut } = useAuthStore();

  const onClick = () => {
    signOut();
  };

  return (
    <PageContainer pageTitle={HOME_PAGE_CONSTANTS.PAGE_TITLE}>
      <div>Home</div>
      <Button onClick={onClick}>Sign out</Button>
    </PageContainer>
  );
};
