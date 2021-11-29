import { Image, Modal } from 'react-bootstrap';
import React, { MouseEvent, useState } from 'react';
import NaverIcon from 'public/img/navericon.png';
import { host, naverClientId } from 'shared/constants/env';
import { generateRandom } from 'client/utils/random';
import WaitingModal from 'client/components/WaitingModal';

function SingUpModal({ isShow, closeModal }: { isShow: boolean, closeModal: Function }) {

  const [waitingModalShow, setWaitingModalShow] = useState(false);

  const waitingModalHandleClose = () => setWaitingModalShow(false);
  const waitingModalHandleShow = () => setWaitingModalShow(true);

  const state = generateRandom();
  const redirectUri = encodeURIComponent(host + '/naver/register-callback');
  const url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + naverClientId + '&redirect_uri=' + redirectUri + '&state=' + state;

  const handleNaverLoginButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    closeModal();
    waitingModalHandleShow();
    if (window && window.location) {
      window.location.href = url;
    }
  };

  return (
    <>
      <Modal show={isShow} onHide={closeModal} backdrop='static' keyboard={false} centered>
        <Modal.Header closeButton className='p-5 pb-4 border-bottom-0'>
          <Modal.Title as='h2' className='fw-bold mb-0'>가입</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-5 pt-0'>
          <div className='d-flex flex-column'>
            <p className='mb-3'>소셜 아이디로 가입하세요.</p>
            <hr />
            <button className='btn p-0 border-0 social-login' onClick={handleNaverLoginButtonClick}>
              <Image src={NaverIcon} className='w-100' />
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <WaitingModal isShow={waitingModalShow} closeModal={waitingModalHandleClose} />
    </>
  );
}

export default SingUpModal;
