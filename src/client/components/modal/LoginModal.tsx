import { Button, ButtonGroup, Form, Image, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import NaverIcon from 'public/img/navericon.png';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { host, naverClientId } from 'shared/constants/env';
import { generateRandom } from 'client/utils/random';
import WaitingModal from 'client/components/modal/WaitingModal';
import PersonalLocalCache from 'client/cache/PersonalLocalCache';

function LoginModal({ isShow, closeModal }: { isShow: boolean, closeModal: Function }) {

  const isBrowser: boolean = typeof (window) !== 'undefined';

  const [keepLoginChecked, setKeepLoginChecked] = useState(false);
  const [localMemoPushChecked, setLocalMemoPushChecked] = useState(false);
  const [waitingModalShow, setWaitingModalShow] = useState(false);

  const waitingModalHandleClose = () => setWaitingModalShow(false);
  const waitingModalHandleShow = () => setWaitingModalShow(true);

  const init = async () => {
    if (isBrowser) {
      const keepLoginChecked: boolean | null = await PersonalLocalCache.getKeepLoginChecked();
      const memoPushChecked: boolean | null = await PersonalLocalCache.getLocalMemoPushChecked();
      if (keepLoginChecked !== null) {
        setKeepLoginChecked(keepLoginChecked);
      }
      if (memoPushChecked !== null) {
        setLocalMemoPushChecked(memoPushChecked);
      }
    }
  };

  useEffect(() => {
    init().then();
  }, []);

  const state = generateRandom();
  const redirectUri = encodeURIComponent(host + '/naver/login-callback' +
    '?keep=' + keepLoginChecked + '&push=' + localMemoPushChecked);
  const url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + naverClientId + '&redirect_uri=' + redirectUri + '&state=' + state;
  const tempLoginUrl = host + '/temp/login-temp-account?keep=' + keepLoginChecked + '&push=' + localMemoPushChecked;

  const handleKeepLoginCheckboxChange = async (event: ChangeEvent) => {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    setKeepLoginChecked(element.checked);
    await PersonalLocalCache.setKeepLoginChecked(element.checked);
  };

  const handleCheckboxChange = async (event: ChangeEvent) => {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    setLocalMemoPushChecked(element.checked);
    await PersonalLocalCache.setLocalMemoPoshChecked(element.checked);
  };

  const handleNaverLoginButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    closeModal();
    waitingModalHandleShow();
    if (window && window.location) {
      window.location.href = url;
    }
  };

  const handleTempLoginButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    closeModal();
    waitingModalHandleShow();
    if (window && window.location) {
      window.location.href = tempLoginUrl;
    }
  }

  return (
    <>
      <Modal show={isShow} onHide={closeModal} backdrop='static' keyboard={false} centered>
        <Modal.Header closeButton className='p-5 pb-4 border-bottom-0'>
          <Modal.Title as='h2' className='fw-bold mb-0'>?????????</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-5 pt-0'>
          <div className='d-flex flex-column'>
            <p className='mb-3'>?????? ???????????? ??????????????????.</p>
            <hr />
            <button className='btn p-0 border-0 social-login' onClick={handleNaverLoginButtonClick}>
              <Image src={NaverIcon} className='w-100' />
            </button>
            <hr />
            <div className='d-flex justify-content-center'>
              <ButtonGroup>
                <Button variant='success' onClick={handleTempLoginButtonClick}>
                  ??????????????????(????????????)
                </Button>
                <OverlayTrigger trigger='click' placement='bottom'
                                overlay={<Tooltip>????????? ?????????????????????<br />??????????????????.<br />?????? ????????? ???????????????.<br />????????? ???????????? ????????? ??? ?????? ????????? ??????/????????? ??? ????????????.</Tooltip>}>
                  <Button variant='outline-success'>?</Button>
                </OverlayTrigger>
              </ButtonGroup>
            </div>
            <hr />
            <div>
              <Form.Group controlId='keepLoginCheckbox'>
                <Form.Check label={<p className='keep-word mb-0'>??? ???????????? ???????????? ???????????????.</p>}
                            className='me-1' checked={keepLoginChecked}
                            onChange={(event: ChangeEvent) => handleKeepLoginCheckboxChange(event)} />
              </Form.Group>
              <Form.Group controlId='localMemoPushCheckbox'>
                <Form.Check label={<p className='keep-word mb-0'>???????????? ???????????? ????????? ????????? ????????? ?????????.</p>}
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
