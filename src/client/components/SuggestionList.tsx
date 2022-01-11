import React, { Fragment, MouseEvent, useEffect, useState } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import {
  GetSuggestionListElementsDocument,
  useDeleteSuggestionMutation,
  useGetSuggestionLazyQuery,
  useGetSuggestionListElementsQuery,
} from 'apollo/generated/hooks';
import { Suggestion, SuggestionListElement } from 'apollo/generated/types';
import { convertDateTimeString } from 'shared/utils/dateUtils';

interface ModalInfo {
  id: string
}

function SuggestionList({ setNumberOfSuggestion }: { setNumberOfSuggestion: Function }) {

  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [confirmModalInfo, setConfirmModalInfo] = useState<ModalInfo>({ id: '' });
  const [contentModalShow, setContentModalShow] = useState(false);

  const { data, error, loading } = useGetSuggestionListElementsQuery();
  const [getSuggestion, suggestionLazyResult] = useGetSuggestionLazyQuery();
  const [deleteSuggestion] = useDeleteSuggestionMutation({
    refetchQueries: [GetSuggestionListElementsDocument],
  });

  const suggestions: SuggestionListElement[] | undefined = data?.suggestions;
  const suggestion: Suggestion | null | undefined = suggestionLazyResult.data?.suggestion;

  useEffect(() => {
    if (!!suggestions) {
      setNumberOfSuggestion(suggestions.length);
    }
  }, [suggestions])

  if (loading) return <div className='py-2'><p>Loading...</p></div>;
  if (error || !data) return <div className='py-2'><p>Error</p></div>;

  const removeSuggestion = (event: MouseEvent, id: string) => {
    if (!id) return;
    deleteSuggestion({ variables: { suggestionId: id } })
      .then(() => {
        setConfirmModalShow(false);
      });
  };

  const handleConfirmModalShow = (id: string) => {
    setConfirmModalInfo({ id: id });
    setConfirmModalShow(true);
  };
  const handleConfirmModalClose = () => {
    setConfirmModalShow(false);
  };
  const handleContentModalShow = (event: MouseEvent, suggestionId: string) => {
    getSuggestion({ variables: { suggestionId: suggestionId } });
    setContentModalShow(true);
  };
  const handleContentModalClose = () => {
    setContentModalShow(false);
  };

  return (
    <>
      <div className='py-2'>
        <ListGroup>
          {suggestions && suggestions.map((suggestion: SuggestionListElement) => (
            <ListGroup.Item key={suggestion.id} variant='light' className='list-group-item-action'>
              <div className='d-flex mb-1'>
                <p className='break-word'>{suggestion.preview}</p>
                <div className='ms-auto'>
                  {getBadge(suggestion.status)}
                </div>
              </div>
              <div className='d-flex'>
                <small className='me-auto'>{convertDateTimeString(suggestion.createdAt)}</small>
                <Button size='sm' variant='outline-secondary' className='mx-1'
                        onClick={(event: MouseEvent) => handleContentModalShow(event, suggestion.id)}>자세히</Button>
                <Button size='sm' variant='outline-danger'
                        onClick={() => handleConfirmModalShow(suggestion.id)}>삭제</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Modal show={confirmModalShow} onHide={handleConfirmModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleConfirmModalClose}>
            취소
          </Button>
          <Button variant='danger'
                  onClick={(event: MouseEvent) => removeSuggestion(event, confirmModalInfo.id)}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={contentModalShow} onHide={handleContentModalClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            자세히
          </Modal.Title>
        </Modal.Header>
        {(suggestionLazyResult.loading || !suggestion)
          ? (<Modal.Body>loading...</Modal.Body>)
          : (
            <Modal.Body>
              {suggestion.content.split('\n').map((item, index) => (
                <Fragment key={'content_' + index}>
                  <small className='break-word'>
                    {item}
                  </small>
                  <br />
                </Fragment>
              ))}
            </Modal.Body>
          )}
        <Modal.Footer>
          <Button onClick={handleContentModalClose}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function getBadge(status: string): JSX.Element {
  let badgeType;
  let badgeName;
  switch (status) {
    case 'REGISTERED':
      badgeType = 'bg-secondary';
      badgeName = '등록';
      break;
    case 'CHECKED':
      badgeType = 'bg-primary';
      badgeName = '확인중';
      break;
    case 'COMPLETED':
      badgeType = 'bg-success';
      badgeName = '완료';
      break;
    default:
      badgeType = '';
  }
  return (
    <span className={'badge ' + badgeType}>{badgeName}</span>
  );
}

export default SuggestionList;
