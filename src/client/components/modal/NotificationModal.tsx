import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Notification, NotificationData } from 'apollo/generated/types';
import { useGetCurrentNotificationQuery } from 'apollo/generated/hooks';
import ReadNotificationIdCache from 'client/cache/ReadNotificationIdCache';

function NotificationModal(): JSX.Element {

  const isBrowser: boolean = typeof (window) !== 'undefined';

  const currentNotificationQueryResult = useGetCurrentNotificationQuery();
  const notification: Notification | null | undefined = currentNotificationQueryResult.data?.currentNotification;
  const data: NotificationData | null | undefined = notification?.data;
  const notificationId: string | undefined = data?.id;

  const [notificationModalShow, setNotificationModalShow] = useState(false);
  const [needToHide, setNeedToHide] = useState(false);

  useEffect(() => {
    init().then();
  }, [data]);

  const init = async () => {
    const needToShow: boolean = (isBrowser && !!data)
      ? !(await ReadNotificationIdCache.isNotificationHidden(data.id)) : false;
    setNotificationModalShow(needToShow);
  };

  const handleInfoModalClose = () => {
    setNotificationModalShow(false);
  };

  const handleConfirmButtonClick = async () => {
    if (needToHide && !!notificationId) {
      await ReadNotificationIdCache.addReadNotificationId(notificationId);
    }
    setNotificationModalShow(false);
  }

  const handleHideCheckboxChange = async () => {
    if (needToHide) {
      setNeedToHide(false);
    } else {
      setNeedToHide(true);
    }
  };

  return (
    <>
      <Modal show={notificationModalShow} onHide={handleInfoModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{!!data ? data.title : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{!!data ? data.content : ''}</p>
        </Modal.Body>
        <Modal.Footer>
          <Form.Group className='me-auto' controlId='hideNotification'>
            <Form.Check label={<p>다시 보지 않기</p>} onChange={handleHideCheckboxChange} />
          </Form.Group>
          <Button variant='success' onClick={handleConfirmButtonClick}>확인</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NotificationModal;
