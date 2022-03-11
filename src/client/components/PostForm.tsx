import React, { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { Button, Form, FormCheck, InputGroup, Modal, Overlay, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import {
  BookmarkedPostsDocument,
  GetCategoriesDocument,
  GetPostDocument,
  useCreateNewPostMutation,
  useUpdateAccountTrackMutation,
  useUpdatePostMutation,
} from 'apollo/generated/hooks';
import { useHistory } from 'react-router-dom';
import PagePaths from 'client/constants/PagePaths';
import QuestionSVG from 'client/assets/QuestionSVG';
import { currentCategoryVar } from 'apollo/caches';

interface PostFormParams {
  categoryId?: string | null,
  id?: string | null,
  currentTitle?: string | null,
  currentContent?: string | null,
  currentTags?: string[] | null
  currentOption?: any
}

interface Tag {
  id: number,
  name: string
}

interface ErrorModalInfo {
  content: string
}

interface DocumentOption {
  hasAutoTag: boolean
}

const NUMBER_OF_TAG_LIMIT = 100;
const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 10000;
const MAX_TAG_LENGTH = 25;
const VALID_TAG_CHARS = /[_\dA-Za-zㄱ-ㆎ가-힣ힰ-ퟆퟋ-ퟻＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]+/g;
const WARNING_INVALID_TAG_CHARS = '태그는 한글, 영어, 밑줄(_) 만 가능합니다.';
const WARNING_DUPLICATED_TAG = '이미 등록된 태그입니다.';
const WARNING_NUMBER_OF_TAG_LIMITED = '등록할 수 있는 태그 개수를 초과하였습니다.';

const DEFAULT_DOCUMENT_OPTION: DocumentOption = {
  hasAutoTag: false,
};

function PostForm({ categoryId, id, currentTitle, currentContent, currentTags, currentOption }: PostFormParams) {

  currentTitle = currentTitle || '';
  currentContent = currentContent || '';
  currentTags = currentTags || [];
  currentOption = currentOption as DocumentOption || DEFAULT_DOCUMENT_OPTION;

  const history = useHistory();

  const [lock, setLock] = useState(false);
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);
  const [contentInfoFade, setContentInfoFade] = useState('fade-out');
  const [tags, setTags] = useState<Tag[]>(currentTags.map((tag, index): Tag => ({ id: index, name: tag })));
  const [hasAutoTag, setHasAutoTag] = useState(currentOption.hasAutoTag);

  const [newTagId, setNewTagId] = useState(currentTags.length);
  const [newTagName, setNewTagName] = useState('');

  const [errorModalShow, setErrorModalShow] = useState(false);
  const [errorModalInfo, setErrorModalInfo] = useState<ErrorModalInfo>({ content: '' });

  const isNew = !id;

  const [createNewPost] = useCreateNewPostMutation({
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
  const [updatePost] = useUpdatePostMutation({
    refetchQueries: [
      {
        query: GetPostDocument,
        variables: { id },
      },
      BookmarkedPostsDocument,
    ],
    update: (cache) => {
      cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'posts',
      });
    },
  });
  const [updateAccountTrack, updateAccountTrackResult] = useUpdateAccountTrackMutation();

  const handleMoveToListClick = (categoryId: string | null | undefined) => {
    if (!categoryId) return;
    updateRecentlyViewedCategoryId(categoryId);
    history.push(PagePaths.Home);
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

  const handleContentAreaKeydown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.code === 'KeyS') {
      event.preventDefault();
      onlySavePost();
    }
  };

  const handleNewTagChange = (event: ChangeEvent) => {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    setTagTooltipShow(false);

    const newTag = element.value;
    if (newTag.length === 0) {
      setNewTagName('');
      return;
    }

    const checkResult = newTag.match(VALID_TAG_CHARS);
    if (!checkResult || (checkResult && checkResult[0] !== newTag)) {
      setTagTooltip(WARNING_INVALID_TAG_CHARS);
      setTagTooltipShow(true);
      return;
    }

    if (newTag.length > MAX_TAG_LENGTH) {
      return;
    }

    setNewTagName(element.value);
  };

  const handleNewTagKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      addNewTag();
      event.preventDefault();
    }
  };

  const handleNewTagOnFocus = () => {
    setTagTooltipShow(false);
  };

  const addNewTag = () => {
    if (newTagName.length === 0) {
      return;
    }

    const duplicatedTags = (tags as Tag[]).filter(tag => tag.name === newTagName.trim());
    if (duplicatedTags.length !== 0) {
      setNewTagName('');
      setTagTooltip(WARNING_DUPLICATED_TAG);
      setTagTooltipShow(true);
      return;
    }

    if (tags.length >= NUMBER_OF_TAG_LIMIT) {
      setNewTagName('');
      setTagTooltip(WARNING_NUMBER_OF_TAG_LIMITED);
      setTagTooltipShow(true);
      return;
    }

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

  const handleSaveButtonClick = () => {
    onlySavePost();
  };

  const onlySavePost = () => {
    if (!id || lock) {
      return;
    } else {
      setLock(true);
    }

    if (!validatePost()) {
      setLock(false);
      return;
    }

    const post = {
      categoryId,
      title,
      content,
      tags: tags.map(tag => tag.name),
      option: {
        hasAutoTag: hasAutoTag,
      },
    };

    updatePost({ variables: { id, ...post } })
      .then(() => {
        showContentInfoAndFadeOut();
        releaseLock();
      });
  };

  const showContentInfoAndFadeOut = () => {
    setContentInfoFade('fade-in');
    setTimeout(() => {
      setContentInfoFade('fade-out');
    }, 2000);
  };

  const releaseLock = () => {
    setTimeout(() => {
      setLock(false);
    }, 1000);
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    if (lock) {
      return;
    } else {
      setLock(true);
    }

    if (!validatePost()) {
      setLock(false);
      return;
    }

    const post = {
      categoryId,
      title,
      content,
      tags: tags.map(tag => tag.name),
      option: {
        hasAutoTag: hasAutoTag,
      },
    };

    if (isNew) {
      createNewPost({ variables: post })
        .then(() => {
          history.push(PagePaths.Home);
        });
    } else {
      updatePost({ variables: { id, ...post } })
        .then(() => {
          if (!!categoryId) {
            updateRecentlyViewedCategoryId(categoryId);
          }
          history.push(PagePaths.Home);
        });
    }
  };

  const updateRecentlyViewedCategoryId = (categoryId: string) => {
    currentCategoryVar(categoryId);
    updateAccountTrack({ variables: { recentlyViewedCategoryId: categoryId } })
      .then(() => {
        const cache = updateAccountTrackResult.client.cache;
        cache.modify({
          id: cache.identify({ __typename: 'User', id: 'ME' }),
          fields: {
            recentlyViewedCategoryId(): string {
              return categoryId;
            },
          },
        });
      });
  };

  const validatePost = (): boolean => {
    if (title.length > MAX_TITLE_LENGTH) {
      setErrorModalInfo({ content: `제목은 ${MAX_TITLE_LENGTH} 자 를 넘을 수 없습니다.` });
      setErrorModalShow(true);
      return false;
    }
    if (content.length === 0) {
      setErrorModalInfo({ content: '본문을 작성해 주세요.' });
      setErrorModalShow(true);
      return false;
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      setErrorModalInfo({ content: `본문은 ${MAX_CONTENT_LENGTH} 자 를 넘을 수 없습니다.` });
      setErrorModalShow(true);
      return false;
    }
    return true;
  };

  const handleErrorModalClose = () => {
    setErrorModalShow(false);
    setErrorModalInfo({ content: '' });
  };

  const [tagTooltipShow, setTagTooltipShow] = useState(false);
  const [tagTooltip, setTagTooltip] = useState(WARNING_INVALID_TAG_CHARS);
  const tagTarget = useRef(null);

  return (
    <>
      <div className='my-4 d-flex'>
        <h2>{(isNew) ? '새 메모 작성' : '메모 수정'}</h2>
        <Button className='ms-auto' variant='success' disabled={!categoryId}
                onClick={() => handleMoveToListClick(categoryId)}>목록</Button>
      </div>
      <Form onSubmit={submitForm}>
        <Form.Group controlId='title' className='mb-3'>
          <Form.Control
            type='text' value={title} placeholder='(제목없음)'
            onChange={handleTitleChange} onKeyPress={handleTitleKeyPress} />
        </Form.Group>
        <Form.Group controlId='content' className='mb-3 d-grid'>
          <Form.Control as='textarea' value={content} onChange={handleContentChange}
                        onKeyDown={handleContentAreaKeydown} rows={16} />
          <div className='d-flex'>
            <div><span className={contentInfoFade}>저장되었습니다.</span></div>
            <div className='ms-auto'>{'(' + content.length + '/' + MAX_CONTENT_LENGTH + ')'}</div>
          </div>
        </Form.Group>
        <InputGroup className='mb-2'>
          <Form.Control ref={tagTarget} type='text' value={newTagName} placeholder='태그 추가'
                        onChange={handleNewTagChange} onKeyPress={handleNewTagKeyPress}
                        onFocus={handleNewTagOnFocus} />
          <Overlay target={tagTarget.current} show={tagTooltipShow} placement='bottom'>
            {(props) => (
              <Tooltip id='tagTooltip' {...props}>
                {tagTooltip}
              </Tooltip>
            )}
          </Overlay>
          <Button variant='outline-secondary' onClick={addNewTag}>태그추가</Button>
        </InputGroup>
        <div>
          {tags && tags.map((tag) => (
            <span key={tag.id} className='badge bg-secondary me-1'>
              {tag.name}
              <button className='ms-1 p-0 border-0' onClick={() => removeTag(tag.id)}><span>X</span></button>
            </span>
          ))}
        </div>
        <hr />
        <div>
          <FormCheck id='custom-switch'>
            <FormCheck.Input type='checkbox'
                             checked={hasAutoTag}
                             onChange={() => setHasAutoTag(!hasAutoTag)} />
            <FormCheck.Label className='mx-1'>자동 태그 추가</FormCheck.Label>
            <OverlayTrigger placement='bottom'
                            overlay={<Popover><Popover.Body>본문을 분석하여 자동으로 태그를 추가합니다.</Popover.Body></Popover>}>
              <div className='d-inline-block'>
                <QuestionSVG />
              </div>
            </OverlayTrigger>
          </FormCheck>
        </div>
        <hr />
        <div className='d-flex'>
          {(isNew)
            ? <Button className='ms-auto' variant='primary' type='submit'>작성</Button>
            : (
              <>
                <Button className='ms-auto' variant='info' onClick={handleSaveButtonClick}>저장</Button>
                <Button className='ms-1' variant='primary' type='submit'>저장후닫기</Button>
              </>
            )}
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
