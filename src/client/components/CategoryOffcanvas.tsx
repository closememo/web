import { Button, Form, Modal, Offcanvas } from 'react-bootstrap';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  ControlledTreeEnvironment,
  InteractionMode,
  Tree,
  TreeItem,
  TreeItemIndex,
} from 'react-complex-tree';
import 'client/css/components/CategoryOffcanvas.css';
import {
  GetCategoriesDocument,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from 'apollo/generated/hooks';
import { Category } from 'apollo/generated/types';
import { currentCategoryVar } from 'apollo/caches';
import { useHistory } from 'react-router-dom';
import PagePaths from 'client/constants/PagePaths';

interface Element {
  index: string,
  hasChildren?: boolean,
  children: string[],
  data: string,
}

interface CategoryInfo {
  index: string,
  name: string
}

const MAX_CATEGORY_LENGTH = 100;
const VALID_CATEGORY_CHARS = /[_\dA-Za-zㄱ-ㆎ가-힣ힰ-ퟆퟋ-ퟻＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]+/g;
const DUMMY_ROOT_NAME = 'root';
const DUMMY_ROOT_FORMAT = {
  index: DUMMY_ROOT_NAME,
  hasChildren: true,
  children: [],
  data: '',
};

function CategoryOffcanvas({ show, handleClose }: { show: boolean, handleClose: Function }) {

  const history = useHistory();

  const [createModalShow, setCreateModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryInfo | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [focusedTreeItem, setFocusedTreeItem] = useState<TreeItemIndex | undefined>();
  const [expandedTreeItems, setExpandedTreeItems] = useState<TreeItemIndex[]>([]);
  const [selectedTreeItems, setSelectedTreeItems] = useState<TreeItemIndex[]>([]);

  const { data, error, loading } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation({
    refetchQueries: [{ query: GetCategoriesDocument }],
  });
  const [updateCategory] = useUpdateCategoryMutation({
    refetchQueries: [{ query: GetCategoriesDocument }],
  });
  const [deleteCategory] = useDeleteCategoryMutation({
    refetchQueries: [{ query: GetCategoriesDocument }],
  });

  if (loading) return makeErrorElement(show, handleClose, <p>Loading...</p>);
  if (error || !data) return makeErrorElement(show, handleClose, <p>Error</p>);

  const categories: Category[] = data.categories;
  const { rootId, rootName, items } = makeItems(categories);

  if (!rootId) {
    return makeErrorElement(show, handleClose, <></>);
  }

  const dummyRoot: Element = Object.assign({},
    DUMMY_ROOT_FORMAT, { children: [items[rootId].index] });
  const mergedItems: { [key: string]: Element } = Object.assign({},
    { [DUMMY_ROOT_NAME]: dummyRoot }, items);

  const modalCreateCategory = () => {
    const parentId = currentCategory && currentCategory.index;
    if (!newCategoryName) return;
    createCategory({ variables: { name: newCategoryName, parentId: parentId } })
      .then(() => {
        setCreateModalShow(false);
      });
  };

  const modalUpdateCategory = () => {
    if (!currentCategory) return;
    if (!newCategoryName) return;
    updateCategory({ variables: { categoryId: currentCategory.index, name: newCategoryName } })
      .then(() => {
        setUpdateModalShow(false);
      });
  };

  const modalDeleteCategory = () => {
    if (!currentCategory) return;
    if (currentCategory.index === rootId) {
      setDeleteModalShow(false);
      return;
    }
    deleteCategory({ variables: { categoryId: currentCategory.index } })
      .then(() => {
        setDeleteModalShow(false);
      });
  };

  const handleNewCategoryName = (event: ChangeEvent) => {
    const newCategoryName = (event.target as HTMLInputElement).value;

    if (newCategoryName.length === 0) {
      setNewCategoryName('');
      return;
    }

    const checkResult = newCategoryName.match(VALID_CATEGORY_CHARS);
    if (!checkResult || (checkResult && checkResult[0] !== newCategoryName)) {
      return;
    }

    if (newCategoryName.length > MAX_CATEGORY_LENGTH) {
      return;
    }

    setNewCategoryName((event.target as HTMLInputElement).value);
  };

  const handleNewCategoryButton = () => {
    setNewCategoryName('');
    setCreateModalShow(true);
  };

  const handleModifyCategoryButton = () => {
    const categoryName = currentCategory ? currentCategory.name : '';
    setNewCategoryName(categoryName);
    setUpdateModalShow(true);
  };

  const handleRemoveCategoryButton = () => {
    setDeleteModalShow(true);
  };

  const handleSelectCategoryButton = () => {
    if (!!currentCategory) {
      currentCategoryVar(currentCategory.index);
      handleClose();
      history.push(PagePaths.Home);
    }
  };

  useEffect(() => {
    init().then();
  }, []);

  const init = async () => {
    setCurrentCategory({
      index: rootId,
      name: rootName,
    });
    setSelectedTreeItems([rootId]);
    setExpandedTreeItems([rootId]);
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>카테고리</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='d-flex mb-1'>
            <Button variant='outline-success' size='sm' className='me-1'
                    onClick={handleNewCategoryButton}>➕</Button>
            <Button variant='outline-warning' size='sm' className='me-1'
                    onClick={handleModifyCategoryButton}>✎</Button>
            <Button variant='outline-danger' size='sm' className='me-auto'
                    onClick={handleRemoveCategoryButton}>➖</Button>
            <Button variant='secondary' size='sm'
                    onClick={handleSelectCategoryButton}>선택</Button>
          </div>
          <ControlledTreeEnvironment
            items={mergedItems}
            getItemTitle={item => item.data}
            defaultInteractionMode={InteractionMode.DoubleClickItemToExpand}
            showLiveDescription={false}
            onFocusItem={(item: TreeItem) => {
              setCurrentCategory({
                index: item.index as string,
                name: item.data,
              });
              setFocusedTreeItem(item.index);
            }}
            onExpandItem={(item: TreeItem) => {
              setExpandedTreeItems([...expandedTreeItems, item.index]);
            }}
            onCollapseItem={(item: TreeItem) => {
              setExpandedTreeItems(expandedTreeItems.filter(index => index !== item.index));
            }}
            onSelectItems={(items: TreeItemIndex[]) => {
              setSelectedTreeItems(items);
            }}
            viewState={{
              ['category-tree']: {
                focusedItem: focusedTreeItem,
                expandedItems: expandedTreeItems,
                selectedItems: selectedTreeItems,
              },
            }}>
            <Tree treeId='category-tree' rootItem={DUMMY_ROOT_NAME} />
          </ControlledTreeEnvironment>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal show={createModalShow} onHide={() => setCreateModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>카테고리 생성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`"${currentCategory?.name}" 아래 새 카테고리를 만듭니다.`}</p>
          <p>새 카테고리 이름을 입력하세요.</p>
          <p>카테고리명은 한글, 영어, 밑줄(_) 만 가능합니다.</p>
          <Form.Control type='text' value={newCategoryName} placeholder='새 카테고리 이름'
                        onChange={handleNewCategoryName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={modalCreateCategory}>확인</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={updateModalShow} onHide={() => setUpdateModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>카테고리 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`"${currentCategory?.name}" 의 이름을 변경합니다.`}</p>
          <p>새 이름을 입력하세요.</p>
          <p>카테고리명은 한글, 영어, 밑줄(_) 만 가능합니다.</p>
          <Form.Control type='text' value={newCategoryName} placeholder='새 카테고리 이름'
                        onChange={handleNewCategoryName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={modalUpdateCategory}>확인</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>카테고리 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(currentCategory?.index === rootId)
            ? <p>기본 카테고리는 삭제할 수 없습니다.</p>
            : (
              <>
                <p>{`"${currentCategory?.name}" 카테고리를 삭제합니다.`}</p>
                <p>카테고리에 포함된 모든 글이 함께 삭제됩니다.</p>
              </>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={modalDeleteCategory}>확인</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function makeErrorElement(show: boolean, handleClose: Function, bodyContent: JSX.Element) {
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>도움말</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {bodyContent}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function makeItems(categories: Category[]) {
  let items: { [key: string]: Element } = {};

  const rootCategory = categories.find(category => category.isRoot);

  if (!rootCategory) {
    return { rootId: null, rootName: '', items: items };
  }

  const rootElement = convert(rootCategory);
  items[rootElement.index] = rootElement;

  const map = makeParentIdCategoryMap(categories);
  putItems(items, rootElement, map);

  return { rootId: rootElement.index, rootName: rootElement.data, items: items };
}

function makeParentIdCategoryMap(categories: Category[]): Map<string, Category[]> {
  let map: Map<string, Category[]> = new Map<string, Category[]>();
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const parentId = category.parentId;
    if (!parentId) continue;
    if (map.has(parentId)) {
      map.get(parentId)?.push(category);
    } else {
      map.set(parentId, [category]);
    }
  }
  return map;
}

function putItems(items: { [key: string]: Element }, target: Element, map: Map<string, Category[]>) {
  const categories: Category[] | undefined = map.get(target.index);
  if (!categories || categories.length == 0) {
    return;
  }

  const children: Element[] = categories.map(category => convert(category));

  children.sort(function(e1, e2) {
    const data1 = e1.data;
    const data2 = e2.data;
    if (data1 < data2) return -1;
    if (data1 > data2) return 1;
    return 0;
  });

  target.hasChildren = true;
  target.children = children.map(element => element.index);

  for (let i = 0; i < children.length; i++) {
    items[children[i].index] = children[i];
  }

  for (let j = 0; j < children.length; j++) {
    putItems(items, children[j], map);
  }
}

function convert(category: Category): Element {
  return {
    index: category.id,
    hasChildren: false,
    children: [],
    data: category.name,
  };
}

export default CategoryOffcanvas;
