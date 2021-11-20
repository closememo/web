import { Form, Image, Modal } from 'react-bootstrap';
import NaverIcon from 'public/img/navericon.png';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { host, naverClientId } from 'shared/constants/env';
import { generateRandom } from 'client/utils/random';
import * as localforage from 'localforage';

function LoginModal({ modalShow, modalClose }: { modalShow: boolean, modalClose: Function }) {

  const isBrowser: boolean = typeof (window) !== 'undefined';

  const [localMemoPushChecked, setLocalMemoPushChecked] = useState(false);

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
  );
}

export default LoginModal;
