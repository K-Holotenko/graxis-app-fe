import { CategoriesSection } from 'src/pages/HomePage/children/CategoriesSection';
import { HeroSection } from 'src/pages/HomePage/children/HeroSection';
import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { HOME_PAGE_CONFIG } from 'src/pages/HomePage/utils/config';

export const HomePage = () => (
  <PageContainer pageTitle={HOME_PAGE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <HeroSection />
      <CategoriesSection />
    </AppLayout>
  </PageContainer>
);
