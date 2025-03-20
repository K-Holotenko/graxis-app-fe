// export const buildCategoriesTree = (categories: any[]) => {
//   const map: { [key: string]: Category } = {};
//   const roots: Category[] = [];

//   categories.forEach((category) => {
//     const { id, parentId, name } = category;

//     // Create a category object if it doesn't exist in the map
//     if (!map[id]) {
//       map[id] = { title: name, value: id, children: [], selectable: true }; // Initialize children and selectable here
//     }

//     // If the category has a parent, add it to the parent's children
//     if (parentId) {
//       if (!map[parentId]) {
//         map[parentId] = {
//           title: parentId,
//           value: parentId,
//           children: [],
//           selectable: true, // Parent is selectable
//         };
//       }

//       // Push the current category into the parent's children
//       map[parentId].children.push(map[id]);

//       // Set the parent category as non-selectable if it has children
//       map[parentId].selectable = false;
//     } else {
//       // If no parentId, it's a root category, add to roots
//       roots.push(map[id]);
//     }
//   });

//   // Now, mark all leaf categories as selectable
//   const markLeafCategoriesSelectable = (categories: Category[]) => {
//     categories.forEach((category) => {
//       if (category.children.length === 0) {
//         category.selectable = true; // Leaf categories are selectable
//       }
//       if (category.children.length > 0) {
//         markLeafCategoriesSelectable(category.children); // Recursively check children
//       }
//     });
//   };

//   markLeafCategoriesSelectable(roots);

//   return roots;
// };

interface RawCategory {
  id: string;
  name: string;
  parentId?: string;
}

interface CategoryNode {
  title: string;
  value: string;
  children: CategoryNode[];
  selectable: boolean;
  parentId?: string;
}

export const buildCategoriesTree = (
  rawCategories: RawCategory[]
): CategoryNode[] => {
  const nodeMap = new Map<string, CategoryNode>();

  // 1. Create nodes while preserving the parentId
  rawCategories.forEach(({ id, name, parentId }) => {
    nodeMap.set(id, {
      title: name,
      value: id,
      children: [],
      selectable: false,
      parentId, // Preserve the original parentId
    });
  });

  // 2. Build the complete hierarchy
  rawCategories.forEach(({ id, parentId }) => {
    const node = nodeMap.get(id)!;

    if (parentId && nodeMap.has(parentId)) {
      const parent = nodeMap.get(parentId)!;

      parent.children.push(node);
    }
  });

  // 3. Determine selectable nodes (leaf nodes)
  nodeMap.forEach((node) => {
    node.selectable = node.children.length === 0;
  });

  // 4. Filter out root elements (without parentId)
  return Array.from(nodeMap.values()).filter(
    (node) => !rawCategories.some((c) => c.id === node.value && c.parentId)
  );
};
