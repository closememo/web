import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useDeletePostMutation, useDeletePostsMutation, useGetPostListQuery } from 'apollo/generated/hooks';
import { Button, Form, ListGroup, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import PagePaths from 'client/constants/PagePaths';
import { convertDateString } from 'shared/utils/dateUtils';

interface ModalInfo {
  id: string
}

function PostList() {

  const history = useHistory();

  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ id: '' });

  const { data, error, loading } = useGetPostListQuery();
  const [deletePost] = useDeletePostMutation();
  const [deletePosts] = useDeletePostsMutation();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const handleItemClick = (event: MouseEvent, id: string) => {
    event.stopPropagation();
  };

  const removePostAndSendMail = (event: MouseEvent, id: string) => {
    event.stopPropagation();
  };

  const removePost = (event: MouseEvent, id: string) => {
    if (!id) return;
    event.stopPropagation();
    deletePost({ variables: { id } })
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
    if (data.posts.length === checkedIds.size) {
      setCheckedIds(new Set());
    } else {
      const allPostIds = data.posts.map((post: any) => post.id);
      setCheckedIds(new Set(allPostIds));
    }
  };

  const handleAllCheckedDeleteClick = () => {

    const ids: string[] = Array.from(checkedIds);

    deletePosts({ variables: { ids } })
      .then(() => {
        history.go(0);
      });
  };

  const handleClose = () => setModalShow(false);
  const handleShow = (id: string) => {
    setModalInfo({ id });
    setModalShow(true);
  };

  return (
    <>
      <div className='my-4'>
        <h2>/</h2>
      </div>
      <div className='d-flex py-2'>
        <Button variant='success' className='me-auto'
                onClick={() => history.push(PagePaths.Write)}>새메모</Button>
        <Button variant='info' className='mx-1' onClick={handleAllCheckButtonClick}>
          {(data.posts.length === checkedIds.size) ? '전체취소' : '전체선택'}
        </Button>
        <Button variant='danger' className='me-1' onClick={handleAllCheckedDeleteClick}>삭제</Button>
        <Button variant='warning'>이동</Button>
      </div>
      <div className='py-2'>
        <ListGroup>
          {data.posts && data.posts.map((post: any) => (
            <ListGroup.Item key={post.id} variant='light' className='list-group-item-action'
                            onClick={(event: MouseEvent) => handleItemClick(event, post.id)}>
              <div className='d-flex w-100'>
                <Form.Check aria-label='option 1' className='me-1' checked={checkedIds.has(post.id)}
                            onChange={(event: ChangeEvent) => handleCheckboxChange(event, post.id)} />
                {getTitleTag(post.id, post.title)}
                <small className='ms-auto'>{convertDateString(post.createdAt)}</small>
              </div>
              <div className='mb-1'>
                {post.tags && post.tags.map((tag: any, index: number) => (
                  <span key={post.id + '_' + index} className='badge bg-secondary me-1'>{tag}</span>
                ))}
              </div>
              <div className='d-flex'>
                <small className='me-auto'>{post.preview}</small>
                <Button size='sm' variant='outline-secondary' className='me-1'
                        onClick={() => history.push('/update/' + post.id)}>📝</Button>
                <Button size='sm' variant='outline-secondary'
                        onClick={() => handleShow(post.id)}>❌</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            취소
          </Button>
          <Button variant='warning'
                  onClick={(event: MouseEvent) => removePostAndSendMail(event, modalInfo.id)}>
            전송+삭제
          </Button>
          <Button variant='danger' onClick={(event: MouseEvent) => removePost(event, modalInfo.id)}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function getTitleTag(id: string, title: string): JSX.Element {
  if (!title) {
    return (
      <h5 className='mb-1'>
        <Link to={'/update/' + id} className='home-underline text-reset'>(제목없음)</Link>
      </h5>
    );
  } else {
    return (
      <h5 className='mb-1 text-dark'>
        <Link to={'/update/' + id} className='home-underline text-reset'>{title}</Link>
      </h5>
    );
  }
}

export default PostList;
