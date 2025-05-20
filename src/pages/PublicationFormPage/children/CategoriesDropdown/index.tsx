import { useState } from 'react';
import { ConfigProvider, TreeSelect, Form } from 'antd';
import Icon from '@ant-design/icons';
import { SafeKey } from 'antd/es/table/interface';

import ArrowDown from 'src/assets/icons/arrow-down.svg?react';
import { TEXT } from 'src/config/constants';
import { theme } from 'src/config/theme';
import ClearIcon from 'src/assets/icons/clear-icon.svg?react';
import { Category, useCategories } from 'src/hooks/useCategories';

import styles from './styles.module.scss';

interface CategoriesDropdownProps {
  labelStyles?: string;
}

export const CategoriesDropdown = ({
  labelStyles,
}: CategoriesDropdownProps) => {
  const [treeValue, setTreeValue] = useState<string | null>(null);
  const [treeExpandedKeys, setTreeExpandedKeys] = useState<SafeKey[]>([]);

  const { categoriesTree } = useCategories();
  const form = Form.useFormInstance();

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
      const path = findParentPath(value, categoriesTree);

      setTreeExpandedKeys(path);
    }
  };

  const treeTitleRender = (category: string | null | Category) => {
    if (typeof category === 'string' || category === null) {
      return <span>{category}</span>;
    }

    const { value, title, children } = category;
    const hasChildren = children && children.length > 0;
    const isHighlighted = treeExpandedKeys.includes(value);
    const isSelected = treeValue === value && !hasChildren;

    const toggleCategory = () => {
      if (hasChildren) {
        setTreeExpandedKeys((prev) => {
          if (prev.includes(value)) {
            return prev.filter((key) => key !== value);
          }
          const parentPath = findParentPath(value, categoriesTree);

          return [...new Set([...parentPath, value])];
        });
      } else {
        handleChange(value);
      }
    };

    return (
      <div
        onClick={toggleCategory}
        className={`${styles.treeNode} 
          ${isSelected ? styles.selectedCategory : ''} 
          ${isHighlighted && hasChildren ? styles.highlightedCategory : ''}`}
      >
        <p className={styles.treeText}>{title}</p>
      </div>
    );
  };

  const locationValue = Form.useWatch('location', form);
  const localTheme = setLocalTheme(treeValue, locationValue);

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
          treeData={categoriesTree}
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

const setLocalTheme = (treeValue: string | null, locationValue: boolean) => ({
  token: {
    borderRadius: 8,
    colorPrimaryHover: theme.N4,
    colorPrimary: treeValue || locationValue ? theme.success : theme.N3,
    colorBorder: treeValue || locationValue ? theme.success : theme.N3,
    boxShadow: 'none',
    boxShadowSecondary: 'none',
    controlOutline: 'none',
    boxShadowTertiary: 'none',
    controlInteractiveSize: 48,
    controlHeight: 48,
    colorTextPlaceholder: theme.N4,
  },
  components: {
    TreeSelect: {
      controlItemBgHover: theme.N2,
      titleHeight: 48,
      controlItemBgActive: theme.secondary,
      paddingXS: 16,
      colorBgTextHover: 'transparent',
    },
  },
});
