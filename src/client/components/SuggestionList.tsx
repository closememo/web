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
                        onClick={(event: MouseEvent) => handleContentModalShow(event, suggestion.id)}>?????????</Button>
                <Button size='sm' variant='outline-danger'
                        onClick={() => handleConfirmModalShow(suggestion.id)}>??????</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Modal show={confirmModalShow} onHide={handleConfirmModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>??????</Modal.Title>
        </Modal.Header>
        <Modal.Body>????????? ?????????????????????????</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleConfirmModalClose}>
            ??????
          </Button>
          <Button variant='danger'
                  onClick={(event: MouseEvent) => removeSuggestion(event, confirmModalInfo.id)}>
            ??????
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={contentModalShow} onHide={handleContentModalClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            ?????????
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
          <Button onClick={handleContentModalClose}>??????</Button>
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
      badgeName = '??????';
      break;
    case 'CHECKED':
      badgeType = 'bg-primary';
      badgeName = '?????????';
      break;
    case 'COMPLETED':
      badgeType = 'bg-success';
      badgeName = '??????';
      break;
    default:
      badgeType = '';
  }
  return (
    <span className={'badge ' + badgeType}>{badgeName}</span>
  );
}

export default SuggestionList;
