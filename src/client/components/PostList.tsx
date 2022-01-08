import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { Button, ButtonGroup, Form, ListGroup, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import PagePaths from 'client/constants/PagePaths';
import { convertDateTimeString } from 'shared/utils/dateUtils';
import WaitingModal from 'client/components/WaitingModal';
import PagingHandle from 'client/components/PagingHandle';

interface ModalInfo {
  ids: string[]
}

interface PostListParams {
  heading: string,
  total?: number,
  currentPage?: number,
  pageSize?: number,
  posts: Array<any>,
  refreshPosts: Function,
  deletePosts: Function,
  mailPosts: Function
}

function PostList({
                    heading,
                    total,
                    currentPage,
                    pageSize,
                    posts,
                    refreshPosts,
                    deletePosts,
                    mailPosts,
                  }: PostListParams) {

  const history = useHistory();

  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ ids: [] });
  const [waitingModalShow, setWaitingModalShow] = useState(false);

  const removePostAndSendMail = (event: MouseEvent, ids: string[]) => {
    if (typeof (ids) === 'undefined' || ids.length === 0) return;
    event.stopPropagation();
    handleClose();
    waitingModalHandleShow();
    mailPosts({ variables: { ids } })
      .then(() => {
        history.go(0);
      });
  };

  const removePost = (event: MouseEvent, ids: string[]) => {
    if (typeof (ids) === 'undefined' || ids.length === 0) return;
    event.stopPropagation();
    deletePosts({ variables: { ids } })
      .then(() => {
        history.go(0);
      });
  };

  const handleCheckboxChange = (event: ChangeEvent, id: string) => {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    checkId(id, element.checked);
  };

  const checkId = (id: string, isChecked: boolean) => {
    const newCheckedIds = new Set(checkedIds);
    if (isChecked) {
      newCheckedIds.add(id);
    } else {
      newCheckedIds.delete(id);
    }
    setCheckedIds(newCheckedIds);
  };

  const handleAllCheckButtonClick = () => {
    if (posts.length === checkedIds.size) {
      setCheckedIds(new Set());
    } else {
      const allPostIds = posts.map((post: any) => post.id);
      setCheckedIds(new Set(allPostIds));
    }
  };

  const handleAllCheckedDeleteClick = () => {
    if (checkedIds.size === 0) {
      return;
    }

    const ids: string[] = Array.from(checkedIds);
    setModalInfo({ ids });
    setModalShow(true);
  };

  const handleClose = () => setModalShow(false);
  const handleShow = (id: string) => {
    setModalInfo({ ids: [id] });
    setModalShow(true);
  };

  const waitingModalHandleClose = () => setWaitingModalShow(false);
  const waitingModalHandleShow = () => setWaitingModalShow(true);

  return (
    <>
      <div className='my-4'>
        <h2>{heading}</h2>
      </div>
      <div className='d-flex py-2'>
        <Button variant='success' className='me-1'
                onClick={() => history.push(PagePaths.Write)}>새메모</Button>
        <Button variant='outline-primary' className='me-auto'
                onClick={() => refreshPosts()}>↻</Button>
        <Button variant='info' className='mx-1' onClick={handleAllCheckButtonClick}>
          {(posts.length === checkedIds.size) ? '전체취소' : '전체선택'}
        </Button>
        <Button variant='danger'
                onClick={handleAllCheckedDeleteClick} disabled={checkedIds.size === 0}>
          삭제
        </Button>
      </div>
      <div className='py-2'>
        <ListGroup>
          {posts && posts.map((post: any) => (
            <ListGroup.Item key={post.id} variant='light' className='list-group-item-action'
                            onClick={(event: MouseEvent) => event.stopPropagation()}>
              <div className='d-flex w-100'>
                <Form.Check aria-label='option 1' className='me-1' checked={checkedIds.has(post.id)}
                            onChange={(event: ChangeEvent) => handleCheckboxChange(event, post.id)} />
                {getTitleElement(post.id, post.title)}
                <small className='ms-auto'>{convertDateTimeString(post.createdAt)}</small>
              </div>
              <div className='mb-1'>
                {post.tags && post.tags.map((tag: any, index: number) =>
                  getTagElement(post.id, tag, index))}
                {post.autoTags && post.autoTags.map((tag: any, index: number) =>
                  getAutoTagElement(post.id, tag, index))}
              </div>
              <div className='d-flex'>
                <small className='me-auto break-word'>{post.preview}</small>
                <Button size='sm' variant='outline-secondary' className='mx-1'
                        onClick={() => history.push('/update/' + post.id)}>📝</Button>
                <Button size='sm' variant='outline-secondary'
                        onClick={() => handleShow(post.id)}>❌</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      {(total && currentPage && pageSize)
        ? <PagingHandle total={total} currentPage={currentPage} pageSize={pageSize} />
        : <></>}
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <ButtonGroup className='me-auto'>
            <Button variant='warning'
                    onClick={(event: MouseEvent) => removePostAndSendMail(event, modalInfo.ids)}>
              전송+삭제
            </Button>
            <OverlayTrigger trigger='click' placement='bottom'
                            overlay={<Tooltip>메모를 메일로 전송한 후<br /> 삭제합니다.<br />약간의 시간이 소요됩니다.</Tooltip>}>
              <Button variant='outline-warning' className='text-dark'>?</Button>
            </OverlayTrigger>
          </ButtonGroup>
          <Button variant='secondary' onClick={handleClose}>
            취소
          </Button>
          <Button variant='danger' onClick={(event: MouseEvent) => removePost(event, modalInfo.ids)}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
      <WaitingModal isShow={waitingModalShow} closeModal={waitingModalHandleClose} />
    </>
  );
}

function getTitleElement(id: string, title: string): JSX.Element {
  if (!title) {
    return (
      <h5 className='mb-1'>
        <Link to={'/update/' + id} className='post-list-title text-reset'>(제목없음)</Link>
      </h5>
    );
  } else {
    return (
      <h5 className='mb-1 text-dark break-word'>
        <Link to={'/update/' + id} className='post-list-title text-reset'>{title}</Link>
      </h5>
    );
  }
}

function getTagElement(id: string, tag: string, index: number): JSX.Element {
  return (
    <Link key={id + '_' + index + '_link'} to={'/search?tag=' + tag}>
      <span key={id + '_' + index} className='badge bg-secondary me-1'>{tag}</span>
    </Link>
  );
}

function getAutoTagElement(id: string, tag: string, index: number): JSX.Element {
  return (
    <Link key={id + '_' + index + '_link'} to={'/search?tag=' + tag}>
      <span key={id + '_auto_' + index} className='badge bg-warning text-dark me-1'>{tag}</span>
    </Link>
  );
}

export default PostList;
