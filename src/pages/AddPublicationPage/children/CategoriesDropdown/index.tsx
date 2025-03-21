import { ReactNode, useEffect, useState } from 'react';
import { ConfigProvider, TreeSelect, Form } from 'antd';
import Icon from '@ant-design/icons';
import { SafeKey } from 'antd/es/table/interface';

import ArrowDown from 'src/assets/icons/arrow-down.svg?react';
import { TEXT } from 'src/config/constants';
import { theme } from 'src/config/theme';
import ClearIcon from 'src/assets/icons/clear-icon.svg?react';
import { useCategoriesStore } from 'src/stores/categoriesStore';
import { buildCategoriesTree } from 'src/utils/buildCategoriesTree';

import styles from './styles.module.scss';

interface CategoriesDropdownProps {
  labelStyles?: string;
}

interface Category {
  title: string;
  value: string;
  children?: Category[];
  labelStyles?: string;
}

export const CategoriesDropdown = ({
  labelStyles,
}: CategoriesDropdownProps) => {
  const { categories, getAllCategories, isLoading } = useCategoriesStore();
  const [treeData, setTreeData] = useState<Category[]>([]);
  const [treeValue, setTreeValue] = useState<string | null>(null);
  const [treeExpandedKeys, setTreeExpandedKeys] = useState<SafeKey[]>([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (categories.length) {
      setTreeData(buildCategoriesTree(categories));
    }
  }, [categories]);

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
      const path = findParentPath(value, treeData);

      setTreeExpandedKeys(path);
    }
  };

  const treeTitleRender = (category: string | null | Category) => {
    if (typeof category === 'string' || category === null) {
      return <span>{category as ReactNode}</span>;
    }

    const hasNoChildren = !category.children || category.children.length === 0;
    const isHighlighted = treeExpandedKeys.includes(category.value);
    const isSelected = treeValue === category.value && hasNoChildren;

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
        label={<label className={labelStyles}>{TEXT.CHOOSE_CATEGORY}</label>}
        name="category"
        rules={[{ required: true, message: TEXT.CHOOSE_CATEGORY }]}
      >
        <TreeSelect
          className={styles.categoriesDropdownTree}
          popupClassName="popUp"
          value={treeValue}
          treeTitleRender={treeTitleRender}
          treeExpandedKeys={treeExpandedKeys}
          treeData={treeData}
          loading={isLoading}
          placeholder={TEXT.CHOOSE_CATEGORY}
          onTreeExpand={(expandedKeys) => setTreeExpandedKeys(expandedKeys)}
          onClear={() => setTreeExpandedKeys([])}
          allowClear={{
            clearIcon: <ClearIcon className={styles.clearIcon} />,
          }}
          switcherIcon={
            <Icon
              component={() => <ArrowDown />}
              className={styles.switcherIcon}
            />
          }
          suffixIcon={
            <Icon
              component={() => <ArrowDown />}
              className={styles.suffixIcon}
            />
          }
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        />
      </Form.Item>
    </ConfigProvider>
  );
};

const localTheme = {
  token: {
    borderRadius: 8,
    colorPrimaryHover: theme.N4,
    colorPrimary: theme.N6,
    boxShadow: 'none',
    boxShadowSecondary: 'none',
    boxShadowTertiary: 'none',
    controlOutline: 'none',
    controlInteractiveSize: 48,
  },
  components: {
    TreeSelect: {
      activeBg: theme.secondaryLight,
      controlOutline: 'none',
      controlItemBgHover: theme.N2,
      titleHeight: 48,
      controlItemBgActive: theme.secondary,
    },
  },
};
