import { ConfigProvider, Form, TreeSelect } from 'antd';

import { ReactComponent as ClearIcon } from 'src/assets/icons/clear-icon.svg';
import { TEXT } from 'src/config/constants';
import { theme } from 'src/config/theme';

import styles from './styles.module.scss';
import { CATEGORIES_DROP_DATA } from './utils/config';

export const CategoriesDropdown = () => {
  const handleTreeNodeClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const parentNode = target.closest('.ant-select-tree-treenode');

    if (parentNode) {
      const switcher = parentNode.querySelector('.ant-select-tree-switcher');

      if (switcher) {
        (switcher as HTMLElement).click();
      }
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          TreeSelect: {
            controlItemBgActive: theme.lightGreenColor,
            controlItemBgHover: theme.hovercolor,
            colorBgTextActive: theme.primaryColor,
            colorTextDisabled: theme.textPrimaryColor,
          },
        },
      }}
    >
      <Form.Item
        label={
          <span className={styles.formItemLabel}>{TEXT.CHOOSE_CATEGORY}</span>
        }
        name="category"
        layout="vertical"
        rules={[{ required: true, message: TEXT.CHOOSE_CATEGORY }]}
      >
        <TreeSelect
          className={styles.categoriesDropdownTree}
          treeData={CATEGORIES_DROP_DATA}
          placeholder={TEXT.CHOOSE_CATEGORY}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          onClick={handleTreeNodeClick}
          treeNodeLabelProp="path"
          allowClear={{
            clearIcon: <ClearIcon />,
          }}
        />
      </Form.Item>
    </ConfigProvider>
  );
};
