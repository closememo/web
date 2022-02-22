import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

function WaitingModal({ isShow, closeModal }: { isShow: boolean, closeModal: Function }) {

  return (
    <Modal size='sm' show={isShow} onHide={closeModal} backdrop='static'
           keyboard={false} centered>
      <Modal.Header>
        <Modal.Title as='h5'>응답을 기다리는 중입니다.</Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex justify-content-center'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Modal.Body>
    </Modal>
  );
}

export default WaitingModal;
