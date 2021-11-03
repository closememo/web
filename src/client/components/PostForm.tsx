import React, { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import {
  GetPostDocument,
  GetPostListDocument,
  useCreateNewPostMutation,
  useUpdatePostMutation,
} from 'apollo/generated/hooks';
import { useHistory } from 'react-router-dom';
import PagePaths from 'client/constants/PagePaths';

interface PostFormParams {
  id?: string | null,
  currentTitle?: string | null,
  currentContent?: string | null,
  currentTags?: string[] | null
}

interface Tag {
  id: number,
  name: string
}

interface ErrorModalInfo {
  content: string
}

const TITLE_MAX_LENGTH = 100;
const CONTENT_MAX_LENGTH = 5000;

function PostForm({ id, currentTitle, currentContent, currentTags }: PostFormParams) {

  currentTitle = currentTitle || '';
  currentContent = currentContent || '';
  currentTags = currentTags || [];

  const history = useHistory();

  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);
  const [tags, setTags] = useState<Tag[]>(currentTags.map((tag, index): Tag => ({ id: index, name: tag })));

  const [newTagId, setNewTagId] = useState(currentTags.length);
  const [newTagName, setNewTagName] = useState('');

  const [errorModalShow, setErrorModalShow] = useState(false);
  const [errorModalInfo, setErrorModalInfo] = useState<ErrorModalInfo>({ content: '' });

  const isNew = !id;

  const [createNewPost] = useCreateNewPostMutation({
    refetchQueries: [
      { query: GetPostListDocument },
    ],
  });
  const [updatePost] = useUpdatePostMutation({
    refetchQueries: [
      { query: GetPostListDocument },
      {
        query: GetPostDocument,
        variables: { id },
      },
    ],
  });

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

  const handleNewTagChange = (event: ChangeEvent) => {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    setNewTagName(element.value);
  };

  const handleNewTagKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      addNewTag();
      event.preventDefault();
    }
  };

  const addNewTag = () => {
    const nextTags = (tags as Tag[]).concat({
      id: newTagId,
      name: newTagName.trim(),
    });

    setNewTagId(newTagId + 1);
    setTags(nextTags);
    setNewTagName('');
  };

  const removeTag = (tagId: number) => {
    const nextTags = tags.filter(tag => tag.id !== tagId);
    setTags(nextTags);
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

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

    const post = {
      title,
      content,
      tags: tags.map(tag => tag.name),
    };

    if (isNew) {
      createNewPost({ variables: post })
        .then(() => {
          history.push(PagePaths.Home);
        });
    } else {
      updatePost({ variables: { id, ...post } })
        .then(() => {
          history.push(PagePaths.Home);
        });
    }
  };

  const handleErrorModalClose = () => {
    setErrorModalShow(false);
    setErrorModalInfo({ content: '' });
  };

  return (
    <>
      <div className='my-4'>
        <h2>{(isNew) ? '새 메모 작성' : '메모 수정'}</h2>
      </div>
      <Form onSubmit={submitForm}>
        <Form.Group controlId='title' className='mb-3'>
          <Form.Control
            type='text' value={title} placeholder='(제목없음)'
            onChange={handleTitleChange} onKeyPress={handleTitleKeyPress} />
        </Form.Group>
        <Form.Group controlId='content' className='mb-3 d-grid'>
          <Form.Control as='textarea' value={content} onChange={handleContentChange} rows={10} />
          <div className='ms-auto'>{'(' + content.length + '/' + CONTENT_MAX_LENGTH + ')'}</div>
        </Form.Group>
        <InputGroup className='mb-2'>
          <Form.Control
            type='text' value={newTagName} placeholder='태그 추가'
            onChange={handleNewTagChange} onKeyPress={handleNewTagKeyPress} />
          <Button variant='outline-secondary' onClick={addNewTag}>Button</Button>
        </InputGroup>
        <div>
          {tags && tags.map((tag) => (
            <span key={tag.id} className='badge bg-secondary me-1'>
              {tag.name}
              <button className='ms-1 p-0 border-0' onClick={() => removeTag(tag.id)}><span>X</span></button>
            </span>
          ))}
          <hr />
        </div>
        <div className='d-flex flex-row-reverse'>
          <Button variant='primary' type='submit'>
            {(isNew) ? '적성' : '수정'}
          </Button>
        </div>
      </Form>
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

export default PostForm;
