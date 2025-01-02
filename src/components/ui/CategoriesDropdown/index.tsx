import { useState, type Key } from 'react';
import { ConfigProvider, Form, TreeSelect } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { TEXT } from 'src/config/constants';
import { theme } from 'src/config/theme';
import { ReactComponent as ClearIcon } from 'src/assets/icons/clear-icon.svg';

import styles from './styles.module.scss';
import { CATEGORIES_DROP_DATA } from './utils/config';

interface Category {
  title: string;
  value: string;
  children?: Category[];
}

export const CategoriesDropdown = () => {
  const [treeValue, setTreeValue] = useState<string | null>(null);
  const [treeExpandedKeys, setTreeExpandedKeys] = useState<Key[]>([]);

  const findParentPath = (value: string, tree: Category[]): string[] => {
    for (const category of tree) {
      if (category.value === value) {
        return [category.value];
      }
      if (category.children) {
        const path = findParentPath(value, category.children);

        if (path.length) {
          return [category.value, ...path];
        }
      }
    }

    return [];
  };

  const handleChange = (value: string | null) => {
    setTreeValue(value);

    if (value) {
      const path = findParentPath(value, CATEGORIES_DROP_DATA);

      setTreeExpandedKeys(path);
    }
  };

  const treeTitleRender = (category: string | null | Category) => {
    if (typeof category === 'string' || category === null) {
      return <span>{category}</span>;
    }

    const hasNoChildren = !category.children || category.children.length === 0;
    const isHighlighted = treeExpandedKeys.includes(category.value);
    const isSelected =
      treeValue === category.value && !category.children?.length;

    return (
      <div
        onClick={() => handleChange(category.value)}
        className={`${styles.treeNode} ${
          isSelected ? styles.selectedCategory : ''
        } ${isHighlighted && !hasNoChildren ? styles.highlightedCategory : ''}`}
      >
        <p className={styles.treeText}>{category.title}</p>
      </div>
    );
  };

  return (
    <ConfigProvider theme={localTheme}>
      <Form.Item
        label={
          <span className={styles.formItemLabel}>{TEXT.CHOOSE_CATEGORY}</span>
        }
        name="category"
        rules={[{ required: true, message: TEXT.CHOOSE_CATEGORY }]}
      >
        <TreeSelect
          className={styles.categoriesDropdownTree}
          popupClassName="popUp"
          value={treeValue}
          treeTitleRender={treeTitleRender}
          treeExpandedKeys={treeExpandedKeys}
          treeData={CATEGORIES_DROP_DATA}
          placeholder={TEXT.CHOOSE_CATEGORY}
          onTreeExpand={(expandedKeys) => setTreeExpandedKeys(expandedKeys)}
          onClear={() => setTreeExpandedKeys([])}
          allowClear={{
            clearIcon: <ClearIcon className={styles.clearIcon} />,
          }}
          switcherIcon={<DownOutlined className={styles.switcherIcon} />}
          suffixIcon={<DownOutlined className={styles.suffixIcon} />}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        />
      </Form.Item>
    </ConfigProvider>
  );
};

const localTheme = {
  components: {
    TreeSelect: {
      controlItemBgHover: theme.hoverColor,
      titleHeight: 46,
      controlItemBgActive: theme.lightGreenColor,
    },
  },
};
