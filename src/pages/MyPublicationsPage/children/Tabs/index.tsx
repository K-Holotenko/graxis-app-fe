import { Tabs, type TabsProps } from 'antd';

import {
  createEmptyState,
  EmptyStateType,
} from 'src/pages/MyPublicationsPage/utils/createEmptyStateContent';

// TODO Remove when publications are present
const shouldShowPublications = false;

const emptyStateMapping: Record<number, EmptyStateType> = {
  1: EmptyStateType.NO_PUBLICATIONS,
  3: EmptyStateType.NO_RENTALS,
};

const tabContentMap: Record<number, string> = {
  1: 'Content of Tab Pane 1',
  2: 'Content of Tab Pane 2',
  3: 'Content of Tab Pane 3',
};

const getTabContent = (key: number) =>
  shouldShowPublications
    ? tabContentMap[key]
    : createEmptyState(emptyStateMapping[key]);

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Здаю',
    children: getTabContent(1),
  },
  {
    key: '2',
    label: 'В оренді',
    //TODO Add children after empty state is confirmed
  },
  {
    key: '3',
    label: 'Орендую',
    children: getTabContent(3),
  },
];

export const MyTabs = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
);
