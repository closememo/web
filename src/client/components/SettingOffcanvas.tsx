import { Button, Offcanvas } from 'react-bootstrap';
import React, { MouseEvent } from 'react';
import { useApolloClient } from '@apollo/client';

function SettingOffcanvas({ show, handleClose }: { show: boolean, handleClose: Function }) {

  const client = useApolloClient();

  const handleLogoutButtonClick = async (event: MouseEvent) => {
    event.preventDefault();
    await client.resetStore();
    window.location.href = '/naver/logout';
  };

  const handleWithdrawButtonClick = async (event: MouseEvent) => {
    event.preventDefault();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>설정</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className='d-grid gap-2'>
          <Button variant='outline-success' className='w-100 navi-btn'
                  onClick={handleLogoutButtonClick}>로그아웃</Button>
          <Button variant='outline-danger' className='w-100 navi-btn'
                  onClick={handleWithdrawButtonClick}>탈퇴</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SettingOffcanvas;
