import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { GetCategoriesDocument, useChangePostsCategoryMutation, useGetCategoriesQuery } from 'apollo/generated/hooks';
import { Category } from 'apollo/generated/types';
import { CategoryInfo, Element, makeItems } from 'client/utils/categoryUtils';
import { ControlledTreeEnvironment, InteractionMode, Tree, TreeItem, TreeItemIndex } from 'react-complex-tree';
import { useHistory } from 'react-router-dom';
import PagePaths from 'client/constants/PagePaths';

const DUMMY_ROOT_NAME = 'root';
const DUMMY_ROOT_FORMAT = {
  index: DUMMY_ROOT_NAME,
  hasChildren: true,
  children: [],
  data: {
    title: '',
  },
};

interface ChangeCategoryModalParams {
  isShow: boolean;
  closeModal: Function;
  ids: string[];
}

function ChangeCategoryModal({
                               isShow, closeModal, ids,
                             }: ChangeCategoryModalParams) {

  const history = useHistory();

  const [currentCategory, setCurrentCategory] = useState<CategoryInfo | null>(null);
  const [focusedTreeItem, setFocusedTreeItem] = useState<TreeItemIndex | undefined>();
  const [expandedTreeItems, setExpandedTreeItems] = useState<TreeItemIndex[]>([]);
  const [selectedTreeItems, setSelectedTreeItems] = useState<TreeItemIndex[]>([]);

  const { data, error, loading } = useGetCategoriesQuery();

  if (loading) return makeErrorElement(isShow, closeModal, <p>Loading...</p>);
  if (error || !data) return makeErrorElement(isShow, closeModal, <p>Error</p>);

  const [changePostsCategory] = useChangePostsCategoryMutation({
    refetchQueries: [
      GetCategoriesDocument,
    ],
    update: (cache) => {
      cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'posts',
      });
    },
  });

  const categories: Category[] = data.categories;
  const { root, items } = makeItems(categories);

  if (!root) {
    return makeErrorElement(isShow, closeModal, <p>Error</p>);
  }

  const dummyRoot: Element = Object.assign({},
    DUMMY_ROOT_FORMAT, { children: [items[root.index].index] });
  const mergedItems: { [key: string]: Element } = Object.assign({},
    { [DUMMY_ROOT_NAME]: dummyRoot }, items);

  useEffect(() => {
    init().then();
  }, []);

  const init = async () => {
    setCurrentCategory(root);
    setSelectedTreeItems([root.index]);
    setExpandedTreeItems([root.index]);
  };

  const handleMoveButtonClick = () => {
    if (!currentCategory || !ids || ids.length === 0) {
      return;
    }

    changePostsCategory({
      variables: { categoryId: currentCategory?.index, ids },
    }).then(() => {
      closeModal();
      history.push(PagePaths.Home);
    });
  };

  return (
    <>
      <Modal show={isShow} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>카테고리 이동</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ControlledTreeEnvironment
            items={mergedItems}
            getItemTitle={item => item.data.title}
            renderItemTitle={({ title, item }) => {
              return <span className='text-dark'>{`${title} `}<sup
                className='text-secondary'>{`(${item.data.count}/${item.data.netCount})`}</sup></span>;
            }}
            defaultInteractionMode={InteractionMode.DoubleClickItemToExpand}
            showLiveDescription={false}
            onFocusItem={(item: TreeItem) => {
              setCurrentCategory({
                index: item.index as string,
                name: item.data.title,
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
              ['change-category-tree']: {
                focusedItem: focusedTreeItem,
                expandedItems: expandedTreeItems,
                selectedItems: selectedTreeItems,
              },
            }}>
            <Tree treeId='change-category-tree' rootItem={DUMMY_ROOT_NAME} />
          </ControlledTreeEnvironment>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => closeModal()}>취소</Button>
          <Button variant='success' onClick={handleMoveButtonClick}>이동</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function makeErrorElement(isShow: boolean, closeModal: Function, body: JSX.Element): JSX.Element {
  return (
    <Modal show={isShow} onHide={closeModal}>
      <Modal.Header closeButton>
        {body}
      </Modal.Header>
    </Modal>
  );
}

export default ChangeCategoryModal;
