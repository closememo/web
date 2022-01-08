import { Button, Modal, Offcanvas } from 'react-bootstrap';
import React, { MouseEvent, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import PagePaths from 'client/constants/PagePaths';

function SettingOffcanvas({ newNotice, show, handleClose }: { newNotice?: boolean, show: boolean, handleClose: Function }) {

  const history = useHistory();

  const client = useApolloClient();

  const [modalShow, setModalShow] = useState(false);

  const handleLogoutButtonClick = async (event: MouseEvent) => {
    event.preventDefault();
    await client.resetStore();
    window.location.href = '/naver/logout';
  };

  const handleWithdrawButtonClick = async (event: MouseEvent) => {
    event.preventDefault();
    await client.resetStore();
    window.location.href = '/naver/withdraw';
  };

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>설정</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='d-flex flex-column'>
          <div className='d-grid gap-2'>
            <Button variant='outline-primary' className='w-100 navi-btn'
                    onClick={() => history.push(PagePaths.Notice)}>
              공지사항
              {newNotice ? newNoticeBadge() : <></>}
            </Button>
          </div>
          <div className='d-grid gap-2 mt-auto'>
            <Button variant='outline-success' className='w-100 navi-btn'
                    onClick={handleLogoutButtonClick}>로그아웃</Button>
            <Button variant='outline-danger' className='w-100 navi-btn'
                    onClick={handleModalShow}>탈퇴</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>정말로 탈퇴하시겠습니까?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>탈퇴시 모든 정보는 삭제됩니다. 메일 전송을 원하시는 경우 탈퇴 전에 요청해주세요.</p>
          <p>재가입은 약 하루 동안 제한됩니다.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleModalClose}>
            취소
          </Button>
          <Button variant='danger' onClick={(event: MouseEvent) => handleWithdrawButtonClick(event)}>
            탈퇴
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function newNoticeBadge() {
  return (
    <span className='position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle'>
      <span className='visually-hidden' />
    </span>
  );
}

export default SettingOffcanvas;
