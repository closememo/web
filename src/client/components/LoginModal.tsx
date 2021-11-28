import { Form, Image, Modal } from 'react-bootstrap';
import NaverIcon from 'public/img/navericon.png';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { host, naverClientId } from 'shared/constants/env';
import { generateRandom } from 'client/utils/random';
import * as localforage from 'localforage';
import WaitingModal from 'client/components/WaitingModal';

function LoginModal({ isShow, closeModal }: { isShow: boolean, closeModal: Function }) {

  const isBrowser: boolean = typeof (window) !== 'undefined';

  const [localMemoPushChecked, setLocalMemoPushChecked] = useState(false);
  const [waitingModalShow, setWaitingModalShow] = useState(false);

  const waitingModalHandleClose = () => setWaitingModalShow(false);
  const waitingModalHandleShow = () => setWaitingModalShow(true);

  const init = async () => {
    if (isBrowser) {
      const checked: boolean | null = await localforage.getItem('localMemoPushChecked');
      if (checked !== null) {
        setLocalMemoPushChecked(checked);
      }
    }
  };

  useEffect(() => {
    init().then();
  }, []);

  const state = generateRandom();
  const redirectUri = encodeURI(host + '/naver/login-callback?push=' + localMemoPushChecked);
  const url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + naverClientId + '&redirect_uri=' + redirectUri + '&state=' + state;

  const handleCheckboxChange = async (event: ChangeEvent) => {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    setLocalMemoPushChecked(element.checked);
    await localforage.setItem('localMemoPushChecked', element.checked);
  };

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
          <Modal.Title as='h2' className='fw-bold mb-0'>로그인</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-5 pt-0'>
          <div className='d-flex flex-column'>
            <p className='mb-3'>소셜 아이디로 로그인하세요.</p>
            <hr />
            <button className='btn p-0 border-0 social-login' onClick={handleNaverLoginButtonClick}>
              <Image src={NaverIcon} className='w-100' />
            </button>
            <hr />
            <div>
              <Form.Group controlId='localMemoPushCheckbox'>
                <Form.Check label={<p className='keep-word'>로그아웃 상태에서 작성한 메모를 업로드 합니다.</p>}
                            className='me-1' checked={localMemoPushChecked}
                            onChange={(event: ChangeEvent) => handleCheckboxChange(event)} />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <WaitingModal isShow={waitingModalShow} closeModal={waitingModalHandleClose} />
    </>
  );
}

export default LoginModal;
