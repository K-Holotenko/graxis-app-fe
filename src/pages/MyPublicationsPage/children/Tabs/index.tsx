import { Tabs, type TabsProps } from 'antd';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Здаю',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'В оренді',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Орендую',
    children: 'Content of Tab Pane 3',
  },
];

export const MyTabs = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
);
