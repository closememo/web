import { Image, Modal } from 'react-bootstrap';
import NaverIcon from 'public/img/navericon.png';
import React from 'react';
import { host, naverClientId } from 'shared/constants/env';
import { generateRandom } from 'client/utils/random';

function LoginModal({ modalShow, modalClose }: { modalShow: boolean, modalClose: Function }) {

  const state = generateRandom()
  const redirectUri = encodeURI(host + "/naver/login-callback");
  const url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + naverClientId + '&redirect_uri=' + redirectUri + '&state=' + state;

  return (
    <Modal show={modalShow} onHide={modalClose} backdrop='static' keyboard={false} centered>
      <Modal.Header closeButton className='p-5 pb-4 border-bottom-0'>
        <Modal.Title as='h2' className='fw-bold mb-0'>로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-5 pt-0'>
        <div className='d-flex flex-column'>
          <p className='mb-3'>소셜 아이디로 로그인하세요.</p>
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

export default LoginModal;
