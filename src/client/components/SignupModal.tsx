import { Image, Modal } from 'react-bootstrap';
import React from 'react';
import NaverIcon from 'public/img/navericon.png';

function SingUpModal({ modalShow, modalClose }: { modalShow: boolean, modalClose: Function }) {

  const clientId = 'OrLmkctsCrhLTJW9OR5J';
  const state = "RAMDOM_STATE";
  const redirectUri = encodeURI("http://localhost:3000/naver/register-callback");

  const url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + clientId + '&redirect_uri=' + redirectUri + '&state=' + state;

  return (
    <Modal show={modalShow} onHide={modalClose} backdrop='static' keyboard={false} centered>
      <Modal.Header closeButton className='p-5 pb-4 border-bottom-0'>
        <Modal.Title as='h2' className='fw-bold mb-0'>가입</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-5 pt-0'>
        <div className='d-flex flex-column'>
          <p className='mb-3'>소셜 아이디로 가입하세요.</p>
          <hr />
          <button className='btn p-0 border-0 social-login'>
            <a href={url}>
              <Image src={NaverIcon} className='w-100' />
            </a>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SingUpModal;
