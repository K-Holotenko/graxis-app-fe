import { useCallback, useState } from 'react';
import { ConfigProvider, Form, TreeSelect } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { ReactComponent as ClearIcon } from 'src/assets/icons/clear-icon.svg';
import { TEXT } from 'src/config/constants';
import { theme } from 'src/config/theme';

import styles from './styles.module.scss';
import { CATEGORIES_DROP_DATA } from './utils/config';

interface Category {
  title: string;
  value: string;
  children?: Category[];
}

const findCategoryPath = (category: Category, tree: Category[]): string[] => {
  for (const node of tree) {
    if (node.value === category.value) {
      return [node.value];
    }

    if (node.children) {
      const childPath = findCategoryPath(category, node.children);

      if (childPath.length > 0) {
        return [node.value, ...childPath];
      }
    }
  }

  return [];
};

export const CategoriesDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<string[]>([]);
  const [treeData, setTreeData] = useState(CATEGORIES_DROP_DATA);
  const [treeKey, setTreeKey] = useState(0);

  const handleTreeNodeClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const parentNode = target.closest(
      '.ant-select-tree-treenode'
    ) as HTMLElement;

    if (parentNode) {
      const switcher = parentNode.querySelector('.ant-select-tree-switcher');

      if (switcher) {
        (switcher as HTMLElement).click();
      }
    }
  };

  const handleNodeClick = useCallback((nodeData: Category) => {
    if (!nodeData.children?.length) {
      setSelectedCategory(nodeData.value);

      const newHighlightedPath = findCategoryPath(
        nodeData,
        CATEGORIES_DROP_DATA
      );

      setHighlightedPath(newHighlightedPath);
    } else {
      setHighlightedPath((prevPath) => {
        if (prevPath.includes(nodeData.value)) {
          return prevPath.filter((item) => item !== nodeData.value);
        }

        return [...prevPath, nodeData.value];
      });
    }
  }, []);

  const treeTitleRender = (nodeData: Category) => {
    const isHighlighted = highlightedPath.includes(nodeData.value);
    const isSelected =
      selectedCategory === nodeData.value && !nodeData.children?.length;

    return (
      <div
        onClick={() => handleNodeClick(nodeData)}
        className={`${styles.treeNode} ${
          isSelected ? styles.selectedCategory : ''
        } ${
          isHighlighted && nodeData.children?.length
            ? styles.highlightedCategory
            : ''
        }`}
      >
        <p className={styles.treeText}>{nodeData.title}</p>
      </div>
    );
  };

  const handleClear = () => {
    setSelectedCategory(null);
    setHighlightedPath([]);
    setTreeData([]);
    setTreeData(CATEGORIES_DROP_DATA);
    setTreeKey((prev) => prev + 1);
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
          onClear={handleClear}
          dropdownStyle={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingLeft: 8,
            paddingRight: 14,
          }}
          popupClassName="popUp"
          className={styles.categoriesDropdownTree}
          treeData={treeData}
          placeholder={TEXT.CHOOSE_CATEGORY}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          onClick={handleTreeNodeClick}
          allowClear={{
            clearIcon: <ClearIcon className={styles.clearIcon} />,
          }}
          switcherIcon={<DownOutlined className={styles.switcherIcon} />}
          suffixIcon={<DownOutlined className={styles.suffixIcon} />}
          treeTitleRender={treeTitleRender}
          key={treeKey}
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
