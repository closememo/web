import { Category } from 'apollo/generated/types';

export interface Element {
  index: string,
  hasChildren?: boolean,
  children: string[],
  data: {
    title: string
    count?: number | null
    netCount?: number | null
  },
}

export interface CategoryInfo {
  index: string,
  name: string
}

export function makeItems(categories: Category[]): { root: CategoryInfo | null, items: { [key: string]: Element } } {
  let items: { [key: string]: Element } = {};

  const rootCategory = categories.find(category => category.isRoot);

  if (!rootCategory) {
    return { root: null, items: items };
  }

  const elements = categories.map(category => convert(category));
  items = elements.reduce((prev, curr) => {
    return Object.assign({}, prev, { [curr.index]: curr });
  }, {});

  const rootElement = convert(rootCategory);

  return { root: { name: rootElement.data.title, index: rootElement.index }, items: items };
}

function convert(category: Category): Element {
  const hasChildren = !!category.childrenIds && (category.childrenIds.length > 0);
  const children: string[] = (!!category.childrenIds) ? category.childrenIds : [];
  return {
    index: category.id,
    hasChildren: hasChildren,
    children: children,
    data: {
      title: category.name,
      count: category.count,
      netCount: category.netCount,
    },
  };
}
``
/**
 * 현재 카테고리가 삭제 대상 카테고리에 있는지 확인.
 * 현재 카테고리의 ID 가 targetId 와 같거나, 삭제 대상(target) 의 자식 중에 현재 카테고리가 있는지 확인
 */
export function isDeletingCategory(categories: Category[], currentId: string, targetId: string): boolean {
  if (currentId === targetId) {
    return true;
  }
  const target = categories.find(category => category.id === targetId);
  if (!target || !target.childrenIds) {
    return false;
  }
  const childrenIds: string[] = target.childrenIds;
  for (let i = 0; i < childrenIds.length; i++) {
    const childrenId = childrenIds[i];
    if (isDeletingCategory(categories, currentId, childrenId)) {
      return true;
    }
  }
  return false;
}
