import React, { useState } from 'react';
import { Button, CloseButton, ListGroup, Modal } from 'react-bootstrap';
import { BookmarkedPostsDocument, useBookmarkedPostsQuery, useDeleteBookmarkMutation } from 'apollo/generated/hooks';
import { BookmarkedPost, SimplePost } from 'apollo/generated/types';
import { Link, useHistory } from 'react-router-dom';

function FixedMenu() {

  const history = useHistory();

  const [modalShow, setModalShow] = useState(false);

  const { data, error, loading } = useBookmarkedPostsQuery();
  const [removeBookmark, deleteBookmarkMutationResult] = useDeleteBookmarkMutation({
    refetchQueries: [BookmarkedPostsDocument],
  });

  const closeModal = () => setModalShow(false);
  const showModal = () => setModalShow(true);

  const handleBookmarkDelete = (postId: string) => {
    if (!postId) return;
    removeBookmark({ variables: { postId } })
      .then(() => {
        const cache = deleteBookmarkMutationResult.client.cache;
        cache.modify({
          id: cache.identify({
            __typename: 'SimplePost',
            id: postId,
          }),
          fields: {
            bookmarked() {
              return false;
            },
          },
        });
      });
  };

  return (
    <>
      <div className='fixed-bottom bg-light d-none d-md-block fixed-menu'>
        <Button variant='outline-success' size='lg' onClick={showModal}>
          🔖
        </Button>
      </div>
      <div className='fixed-bottom bg-light d-md-none'>
        <div className='d-flex p-1'>
          <Button variant='outline-success' className='ms-auto' onClick={showModal}>
            🔖
          </Button>
        </div>
      </div>
      <Modal show={modalShow} onHide={closeModal} centered>
        <Modal.Header>
          <Modal.Title>바로가기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? <p>Loading...</p> : <></>}
          {(error || !data) ? <p>Error</p> : <></>}
          <ListGroup>
            {data && data.bookmarkedPosts.map((bookmarked: BookmarkedPost) => (
              <ListGroup.Item key={bookmarked.id} variant='light' className='list-group-item-action px-2 py-1'>
                <div className='d-flex mb-1'>
                  {!bookmarked.title
                    ? <h6>
                      <Link to={'/update/' + bookmarked.documentId} className='post-list-title text-reset'>(제목없음)</Link>
                    </h6>
                    : <h6 className='text-dark break-word'>
                      <Link to={'/update/' + bookmarked.documentId}
                            className='post-list-title text-reset'>{bookmarked.title}</Link>
                    </h6>}
                  <CloseButton className='ms-auto me-1 btn-sm'
                               onClick={() => handleBookmarkDelete(bookmarked.documentId)} />
                </div>
                <div className='d-flex'>
                  <small className='me-auto break-word'>{bookmarked.preview}</small>
                  <Button size='sm' variant='outline-warning' className='mx-1'
                          onClick={() => history.push('/update/' + bookmarked.documentId)}>✎</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => closeModal()}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FixedMenu;
