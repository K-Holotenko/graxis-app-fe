import { Tabs, type TabsProps } from 'antd';

import { createEmptyState } from 'src/pages/MyPublicationsPage/utils/createEmptyStateContent';

const shouldShowPublications = false;

const tabContentMap: Record<number, string> = {
  1: 'Content of Tab Pane 1',
  2: 'Content of Tab Pane 3',
};

const getTabContent = (key: number) =>
  shouldShowPublications ? tabContentMap[key] : createEmptyState(key);

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Здаю',
    children: getTabContent(1),
  },
  {
    key: '2',
    label: 'В оренді',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Орендую',
    children: getTabContent(2),
  },
];

export const MyTabs = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
);
