import { Tabs, type TabsProps } from 'antd';
import { useNavigate, generatePath, useParams } from 'react-router-dom';

import { PublicationFilters } from 'src/stores/myPublicationStore';
import { ROUTES } from 'src/router/routes';

import { TabsContent } from './TabsContent';

const items: TabsProps['items'] = [
  {
    key: PublicationFilters.LISTED,
    label: 'Здаю',
    children: <TabsContent />,
  },
  {
    key: PublicationFilters.RENTED_OUT,
    label: 'В оренді',
    children: <TabsContent />,
  },
  {
    key: PublicationFilters.RENTING,
    label: 'Орендую',
    children: <TabsContent />,
  },
];

export const MyTabs = () => {
  const navigate = useNavigate();
  const { tab } = useParams<{ tab: PublicationFilters }>();

  return (
    <Tabs
      activeKey={tab}
      items={items}
      onChange={(selectedTab) =>
        navigate(generatePath(ROUTES.MY_PUBLICATIONS, { tab: selectedTab }))
      }
    />
  );
};
