import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ErrorModalParams {
  isShow: boolean;
  content: string;
  closeModal: () => void
}

function ErrorModal({ isShow, content, closeModal }: ErrorModalParams) {

  return (
    <Modal show={isShow} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>에러</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
