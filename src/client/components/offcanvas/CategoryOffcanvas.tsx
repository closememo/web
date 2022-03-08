import { Button, Form, Modal, Offcanvas } from 'react-bootstrap';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
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
  useUpdateCategoryMutation,
} from 'apollo/generated/hooks';
import { Category } from 'apollo/generated/types';
import { currentCategoryVar } from 'apollo/caches';
import { useHistory } from 'react-router-dom';
import PagePaths from 'client/constants/PagePaths';
import { CategoryInfo, Element, makeItems } from 'client/utils/categoryUtils';
import ErrorModal from 'client/components/modal/ErrorModal';
import { ApolloError } from '@apollo/client';
import ApolloErrorTypes from 'client/constants/ApolloErrorTypes';

interface CategoryOffcanvasParam {
  show: boolean,
  handleClose: Function,
  categories?: Category[],
  needToBeSelected: string[],
  needToBeExpanded: string[]
}

const MAX_CATEGORY_LENGTH = 100;
const VALID_CATEGORY_CHARS = /[_\dA-Za-zㄱ-ㆎ가-힣ힰ-ퟆퟋ-ퟻＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]+/g;
const DUMMY_ROOT_NAME = 'root';
const DUMMY_ROOT_FORMAT = {
  index: DUMMY_ROOT_NAME,
  hasChildren: true,
  children: [],
  data: {
    title: '',
  },
};

function CategoryOffcanvas({show, handleClose, categories, needToBeSelected, needToBeExpanded }: CategoryOffcanvasParam) {

  const history = useHistory();

  const [createModalShow, setCreateModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [errorModalShow, setErrorModalShow] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState('');
  const [currentCategory, setCurrentCategory] = useState<CategoryInfo | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [focusedTreeItem, setFocusedTreeItem] = useState<TreeItemIndex | undefined>();
  const [expandedTreeItems, setExpandedTreeItems] = useState<TreeItemIndex[]>([]);
  const [selectedTreeItems, setSelectedTreeItems] = useState<TreeItemIndex[]>([]);

  const newCategoryNameInput = useRef<HTMLInputElement>(null);
  const updateCategoryNameInput = useRef<HTMLInputElement>(null);

  const [createCategory] = useCreateCategoryMutation({
    refetchQueries: [{ query: GetCategoriesDocument }],
  });
  const [updateCategory] = useUpdateCategoryMutation({
    refetchQueries: [{ query: GetCategoriesDocument }],
  });
  const [deleteCategory] = useDeleteCategoryMutation({
    refetchQueries: [{ query: GetCategoriesDocument }],
  });

  if (!categories) return makeErrorElement(show, handleClose, <p>Error</p>);

  const { root, items } = makeItems(categories);

  if (!root) {
    return makeErrorElement(show, handleClose, <></>);
  }

  const dummyRoot: Element = Object.assign({},
    DUMMY_ROOT_FORMAT, { children: [items[root.index].index] });
  const mergedItems: { [key: string]: Element } = Object.assign({},
    { [DUMMY_ROOT_NAME]: dummyRoot }, items);

  const modalCreateCategory = () => {
    const parentId = currentCategory && currentCategory.index;
    if (!newCategoryName) return;
    createCategory({ variables: { name: newCategoryName, parentId: parentId } })
      .then(() => {
        setCreateModalShow(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const modalUpdateCategory = () => {
    if (!currentCategory) return;
    if (!newCategoryName) return;
    updateCategory({ variables: { categoryId: currentCategory.index, name: newCategoryName } })
      .then(() => {
        setUpdateModalShow(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleError = (error: Error) => {
    if (error instanceof ApolloError) {
      switch (error.message) {
        case ApolloErrorTypes.CATEGORY_NAME_ALREADY_EXIST:
          setErrorModalContent('같은 이름의 카테고리가 존재합니다.');
          break;
        default:
          setErrorModalContent('에러가 발생하였습니다.');
      }
      setCreateModalShow(false);
      setUpdateModalShow(false);
      setErrorModalShow(true);
    }
  };

  const modalDeleteCategory = () => {
    if (!currentCategory) return;
    if (currentCategory.index === root.index) {
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
    setTimeout(() => { // setTimeout 으로 해야 동작
      newCategoryNameInput.current?.focus();
    }, 10);
  };

  const handleModifyCategoryButton = () => {
    const categoryName = currentCategory ? currentCategory.name : '';
    setNewCategoryName(categoryName);
    setUpdateModalShow(true);
    setTimeout(() => { // setTimeout 으로 해야 동작
      updateCategoryNameInput.current?.focus();
    }, 10);
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
    setCurrentCategory(root);
    setSelectedTreeItems([root.index]);
    setExpandedTreeItems([root.index]);
  };

  useEffect(() => {
    setSelectedTreeItems(needToBeSelected);
  }, [needToBeSelected]);

  useEffect(() => {
    setExpandedTreeItems(needToBeExpanded);
  }, [needToBeExpanded]);

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
            getItemTitle={item => item.data.title}
            renderItemTitle={({ title, item }) => {
              return <span className='text-dark'>{`${title} `}<sup className='text-secondary'>{`(${item.data.count}/${item.data.netCount})`}</sup></span>;
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
          <p>{`'${currentCategory?.name}' 아래 새 카테고리를 만듭니다.`}</p>
          <p>카테고리명은 한글, 영어, 밑줄(_) 만 가능합니다.</p>
          <Form.Control type='text' value={newCategoryName} placeholder='새 카테고리 이름'
                        ref={newCategoryNameInput} onChange={handleNewCategoryName} />
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
          <p>{`'${currentCategory?.name}' 의 이름을 변경합니다.`}</p>
          <p>카테고리명은 한글, 영어, 밑줄(_) 만 가능합니다.</p>
          <Form.Control type='text' value={newCategoryName} placeholder='새 카테고리 이름'
                        ref={updateCategoryNameInput} onChange={handleNewCategoryName} />
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
          {(currentCategory?.index === root.index)
            ? <p>기본 카테고리는 삭제할 수 없습니다.</p>
            : (
              <>
                <p>{`'${currentCategory?.name}' 카테고리를 삭제합니다.`}</p>
                <p>카테고리에 포함된 모든 글이 함께 삭제됩니다.</p>
              </>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={modalDeleteCategory}>확인</Button>
        </Modal.Footer>
      </Modal>
      <ErrorModal isShow={errorModalShow} content={errorModalContent}
                  closeModal={() => setErrorModalShow(false)} />
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

export default CategoryOffcanvas;
