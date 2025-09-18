import { useParams } from 'react-router-dom';

import { PageContainer } from 'src/layouts/PageContainer';
import { SingleColumnLayout } from 'src/layouts/SingleColumnLayout';
import { AppLayout } from 'src/layouts/AppLayout';
import { Heading } from 'src/components/Heading';
import { PublicationFilters } from 'src/stores/myPublicationStore';
import { NotFoundPage } from 'src/pages/NotFoundPage';

import { MyTabs } from './children/Tabs';

// export const MyPublicationsPage = () => {
//   const { tab } = useParams<{ tab: PublicationFilters }>();
//   const validTabs = Object.values(PublicationFilters);

//   if (!tab || !validTabs.includes(tab as PublicationFilters)) {
//     return <NotFoundPage />;
//   }

//   return (
//     <PageContainer pageTitle="Мої оголошення">
//       <AppLayout>
//         <MyPublicationsLayout
//           title={<Heading level={2}>Мої оголошення</Heading>}
//           tabs={<MyTabs />}
//         />
//       </AppLayout>
//     </PageContainer>
//   );
// };
export const MyPublicationsPage = () => {
  const { tab } = useParams<{ tab: PublicationFilters }>();
  const validTabs = Object.values(PublicationFilters);

  if (!tab || !validTabs.includes(tab as PublicationFilters)) {
    return <NotFoundPage />;
  }

  return (
    <PageContainer pageTitle="Мої оголошення">
      <AppLayout>
        <SingleColumnLayout title={<Heading level={2}>Мої оголошення</Heading>}>
          <MyTabs />
        </SingleColumnLayout>
      </AppLayout>
    </PageContainer>
  );
};
