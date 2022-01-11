import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import SuggestionList from 'client/components/SuggestionList';
import { GetSuggestionListElementsDocument, useCreateSuggestionMutation } from 'apollo/generated/hooks';

interface ErrorModalInfo {
  content: string
}

const NUMBER_OF_SUGGESTION_LIMIT = 50;
const MAX_CONTENT_LENGTH = 1000;

function SuggestionForm() {

  const [content, setContent] = useState<string>('');
  const [numberOfSuggestion, setNumberOfSuggestion] = useState<number>(0);

  const [errorModalShow, setErrorModalShow] = useState(false);
  const [errorModalInfo, setErrorModalInfo] = useState<ErrorModalInfo>({ content: '' });

  const [createSuggestion] = useCreateSuggestionMutation({
    refetchQueries: [GetSuggestionListElementsDocument],
  });

  const handleContentChange = (event: ChangeEvent) => {
    setContent((event.target as HTMLInputElement).value);
  };

  const handleErrorModalClose = () => {
    setErrorModalShow(false);
    setErrorModalInfo({ content: '' });
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    if (content.length === 0) {
      setErrorModalInfo({ content: '내용을 작성해 주세요.' });
      setErrorModalShow(true);
      return;
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      setErrorModalInfo({ content: `내용을 ${MAX_CONTENT_LENGTH} 자 를 넘을 수 없습니다.` });
      setErrorModalShow(true);
      return;
    }

    if (numberOfSuggestion > NUMBER_OF_SUGGESTION_LIMIT) {
      setErrorModalInfo({ content: `최대 ${NUMBER_OF_SUGGESTION_LIMIT} 개 까지 등록할 수 있습니다.` });
      setErrorModalShow(true);
      return;
    }

    const suggestion = { content };

    createSuggestion({
      variables: suggestion,
    }).then(() => {
      setContent('');
    });
  };

  return (
    <>
      <div className='my-4'>
        <h2>오류신고/건의</h2>
        <p>사용 중 발생한 문제가 있거나 추가되었으면 하는 기능이 있다면 운영팀에 알려주세요.</p>
      </div>
      <Form onSubmit={submitForm}>
        <Form.Group controlId='content' className='mb-3 d-grid'>
          <Form.Control as='textarea' value={content} onChange={handleContentChange} rows={5} required />
          <div className='ms-auto'>{'(' + content.length + '/' + MAX_CONTENT_LENGTH + ')'}</div>
        </Form.Group>
        <div className='d-flex'>
          <Button variant='primary' type='submit' className='ms-auto'>작성</Button>
        </div>
      </Form>
      <hr />
      <SuggestionList setNumberOfSuggestion={setNumberOfSuggestion} />
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

export default SuggestionForm;
