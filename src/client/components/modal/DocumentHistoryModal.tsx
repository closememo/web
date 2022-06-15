import React, { MouseEvent } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { GetDifferencesDocument, useClearDifferencesMutation, useGetDifferencesQuery } from 'apollo/generated/hooks';
import { SimpleDifference } from 'apollo/generated/types';
import Loading from 'client/components/Loading';
import { convertDateTimeString } from 'shared/utils/dateUtils';

interface DocumentHistoryModalParam {
  documentId: string;
  modalShow: boolean;
  closeModal: Function;
}

function DocumentHistoryModal({ documentId, modalShow, closeModal }: DocumentHistoryModalParam) {

  const history = useHistory();

  const { data, error, loading } = useGetDifferencesQuery({
    variables: { documentId },
  });

  const [clearDifferences, clearDifferencesMutationResult] = useClearDifferencesMutation({
    // refetchQueries: [{
    //   query: GetDifferencesDocument,
    //   variables: { documentId },
    // }],
    update: (cache) => {
      cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'differences',
      });
    },
  });

  const differences: SimpleDifference[] | undefined = data?.differences;

  if (error || !data) return <p>Error</p>;

  const handleClearDifferencesButton = (event: MouseEvent) => {
    clearDifferences({ variables: { id: documentId } })
      .then(() => {
        const cache = clearDifferencesMutationResult.client.cache;
        cache.modify({
          id: cache.identify({ __typename: 'Post', id: documentId }),
          fields: {
            diffCount() {
              return 0;
            },
          },
        });
        closeModal();
      });
  };

  return (
    <Modal show={modalShow} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{'변경내역 [' + (differences?.length || 0) + '/10]'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? <Loading /> : <></>}
        <ListGroup>
          {differences && differences.map((difference: SimpleDifference) => (
            <ListGroup.Item key={difference.id} action
                            onClick={() => history.push('/difference/' + difference.id)}>
              <div>
                <h5>{convertDateTimeString(difference.createdAt)}</h5>
              </div>
              <div className='d-flex'>
                <div className='ms-auto'>변경된 줄 수</div>
                <div className='ms-2 text-danger'>{'삭제 -' + (difference.changed + difference.deleted)}</div>
                <div className='ms-2 text-success'>{'추가 +' + (difference.changed + difference.inserted)}</div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={handleClearDifferencesButton}>내역삭제</Button>
        <Button variant='secondary' onClick={() => closeModal()}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DocumentHistoryModal;
