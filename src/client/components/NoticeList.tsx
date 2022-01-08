import React, { Fragment, MouseEvent, useEffect, useState } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { useGetNoticeLazyQuery, useGetNoticeListElementsQuery } from 'apollo/generated/hooks';
import { Notice, NoticeListElement } from 'apollo/generated/types';
import { convertDateString } from 'shared/utils/dateUtils';

function NoticeList() {

  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { data, error, loading } = useGetNoticeListElementsQuery();
  const [getNotice, noticeLazyResult] = useGetNoticeLazyQuery();

  const noticeListElements: NoticeListElement[] | undefined = data?.noticeListElements?.data;
  const notice: Notice | null | undefined = noticeLazyResult.data?.notice;

  useEffect(() => {
    const title = notice?.title || '';
    const content = notice?.content || '';

    setTitle(title);
    setContent(content);
  }, [notice]);

  if (loading) return loadingElement();
  if (error || !data) return errorElement();

  const handleModalShow = (event: MouseEvent, noticeId: string) => {
    event.stopPropagation();
    getNotice({ variables: { noticeId: noticeId } });
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  return (
    <>
      <div className='my-4'>
        <h2>공지사항</h2>
      </div>
      <div className='py-2'>
        <ListGroup>
          {noticeListElements && noticeListElements.map((notice: NoticeListElement) => (
            <ListGroup.Item key={notice.id} action variant='success' className='list-group-item-action'
                            onClick={(event: MouseEvent) => handleModalShow(event, notice.id)}>
              <div className='d-flex'>
                <h5>{notice.title}</h5>
              </div>
              <div className='d-flex'>
                <small>{notice.preview}</small>
              </div>
              <div className='d-flex'>
                <small className='ms-auto'>{convertDateString(notice.createdAt)}</small>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        size='lg'
        centered>
        {(noticeLazyResult.loading || !noticeLazyResult.data)
          ? <Modal.Body><p>loading...</p></Modal.Body>
          : (
            <>
              <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                  {title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {content.split('\n').map((item, index) => (
                  <Fragment key={'content_' + index}>
                    <small>
                      {item}
                    </small>
                    <br />
                  </Fragment>
                ))}
              </Modal.Body>
            </>
          )}
        <Modal.Footer>
          <Button onClick={handleModalClose}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function loadingElement() {
  return (
    <>
      <div className='my-4'>
        <h2>공지사항</h2>
      </div>
      <p>Loading...</p>
    </>
  );
}

function errorElement() {
  return (
    <>
      <div className='my-4'>
        <h2>공지사항</h2>
      </div>
      <p>Error</p>
    </>
  );
}

export default NoticeList;
