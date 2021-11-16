import { Button, Form, Modal } from 'react-bootstrap';
import React, { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import { LocalPost } from 'client/components/local/LocalPage';
import { getNowDateString } from 'shared/utils/dateUtils';

interface LocalWriteParam {
  localforage: LocalForage,
  currentId: string | null,
  setCurrentId: Function,
  refresh: Function,
}

interface ErrorModalInfo {
  content: string
}

const NUMBER_OF_POSTS_LIMIT = 100;
const TITLE_MAX_LENGTH = 100;
const CONTENT_MAX_LENGTH = 3000;

function LocalWrite({ localforage, currentId, setCurrentId, refresh }: LocalWriteParam) {

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [errorModalShow, setErrorModalShow] = useState(false);
  const [errorModalInfo, setErrorModalInfo] = useState<ErrorModalInfo>({ content: '' });

  const isNew = !currentId;

  useEffect(() => {
    if (!isNew) {
      initPost(currentId).then();
    }
  }, [currentId]);

  const initPost = async (postId: string) => {
    if (!postId) {
      return;
    }

    const post = await localforage.getItem(postId) as LocalPost;
    setTitle(post.title);
    setContent(post.content);
  };

  const handleTitleChange = (event: ChangeEvent) => {
    setTitle((event.target as HTMLInputElement).value);
  };

  const handleTitleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const handleContentChange = (event: ChangeEvent) => {
    setContent((event.target as HTMLInputElement).value);
  };

  const handleNewButtonClick = () => {
    clearContent();
  };

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    let postIds: string[] | null = await localforage.getItem('postIds');
    if (postIds === null) postIds = [];

    if (postIds.length >= NUMBER_OF_POSTS_LIMIT) {
      setErrorModalInfo({ content: `저장할 수 있는 글의 수는 최대 ${NUMBER_OF_POSTS_LIMIT} 개 입니다.` });
      setErrorModalShow(true);
      return;
    }

    if (title.length > TITLE_MAX_LENGTH) {
      setErrorModalInfo({ content: `제목은 ${TITLE_MAX_LENGTH} 자 를 넘을 수 없습니다.` });
      setErrorModalShow(true);
      return;
    }

    if (content.length === 0) {
      setErrorModalInfo({ content: '본문을 작성해 주세요.' });
      setErrorModalShow(true);
      return;
    }

    if (content.length > CONTENT_MAX_LENGTH) {
      setErrorModalInfo({ content: `본문은 ${CONTENT_MAX_LENGTH} 자 를 넘을 수 없습니다.` });
      setErrorModalShow(true);
      return;
    }

    const post: LocalPost = {
      id: (isNew) ? generateNewPostId() : currentId,
      title,
      content,
    };

    if (isNew) {
      postIds.push(post.id);
      await localforage.setItem('postIds', postIds);
    }

    await localforage.setItem(post.id, post);

    clearContent();
  };

  const removePost = async () => {
    if (!currentId) {
      return;
    }

    let postIds: string[] | null = await localforage.getItem('postIds');
    if (postIds === null) postIds = [];

    const nextPostIds = postIds.filter(postId => currentId !== postId);
    await localforage.setItem('postIds', nextPostIds);
    await localforage.removeItem(currentId);

    setDeleteModalShow(false);
    clearContent();
  };

  const clearContent = () => {
    setTitle('');
    setContent('');
    setCurrentId(null);
    refresh();
  };

  const handleDeleteModalClose = () => setDeleteModalShow(false);
  const handleDeleteModalShow = () => setDeleteModalShow(true);
  const handleErrorModalClose = () => {
    setErrorModalShow(false);
    setErrorModalInfo({ content: '' });
  };

  return (
    <>
      <div className='my-4'>
        <h2>{(isNew) ? '[로그아웃] 메모 작성' : '[로그아웃] 메모 수정'}</h2>
      </div>
      <Form onSubmit={submitForm}>
        <Form.Group controlId='title' className='mb-3'>
          <Form.Control
            type='text' value={title} placeholder='(제목없음)'
            onChange={handleTitleChange} onKeyPress={handleTitleKeyPress} />
        </Form.Group>
        <Form.Group controlId='content' className='mb-3 d-grid'>
          <Form.Control as='textarea' value={content} onChange={handleContentChange} rows={10} required />
          <div className='ms-auto'>{'(' + content.length + '/' + CONTENT_MAX_LENGTH + ')'}</div>
        </Form.Group>
        <div className='d-flex'>
          {(isNew)
            ? <Button variant='primary' type='submit' className='ms-auto'>작성</Button>
            : (
              <>
                <Button variant='success' onClick={handleNewButtonClick}>새메모</Button>
                <Button variant='danger' className='ms-auto me-1'
                        onClick={handleDeleteModalShow}>삭제</Button>
                <Button variant='primary' type='submit'>수정</Button>
              </>)}
        </div>
      </Form>
      <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleDeleteModalClose}>
            취소
          </Button>
          <Button variant='danger' onClick={removePost}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={errorModalShow} onHide={handleErrorModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>에러</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorModalInfo.content}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleErrorModalClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function generateNewPostId(): string {
  return getNowDateString();
}

export default LocalWrite;
