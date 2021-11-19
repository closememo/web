import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Container, Form, FormControl, Modal, Nav, Navbar } from 'react-bootstrap';
import HelpOffcanvas from 'client/components/HelpOffcanvas';
import LoginModal from 'client/components/LoginModal';
import SignupModal from 'client/components/SignupModal';
import SettingOffcanvas from 'client/components/SettingOffcanvas';
import { Link, useHistory } from 'react-router-dom';
import States from 'client/constants/States';

function Navigation({ state, isLoggedIn }: { state?: string | null, isLoggedIn: boolean }) {

  const history = useHistory();

  const [query, setQuery] = useState('');

  const [infoModalShow, setInfoModalShow] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState('');

  const [categoryOffcanvasShow, setCategoryOffcanvasShow] = useState(false);
  const [settingOffcanvasShow, setSettingOffcanvasShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);

  useEffect(() => {
    if (state) {
      if (!isLoggedIn) {
        setInfoModalShow(true);
        switch (state) {
          case States.NEED_REGISTER:
            setInfoModalContent('계정이 존재하지 않습니다. 먼저 가입해 주세요.');
            break;
          case States.JUST_REGISTERED:
            setInfoModalContent('로그인 해 주세요.');
        }
      } else {
        history.replace('/');
      }
    }
  }, []);

  const handleQueryChange = (event: ChangeEvent) => {
    setQuery((event.target as HTMLInputElement).value);
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    history.push('/search?tag=' + query);
  };

  const handleCategoryOffcanvasClose = () => setCategoryOffcanvasShow(false);
  const handleCategoryOffcanvasShow = () => setCategoryOffcanvasShow(true);

  const handleSettingOffcanvasClose = () => setSettingOffcanvasShow(false);
  const handleSettingOffcanvasShow = () => setSettingOffcanvasShow(true);

  const handleLoginModalClose = () => setLoginModalShow(false);
  const handleLoginModalShow = () => setLoginModalShow(true);

  const handleSignUpModalClose = () => setSignUpModalShow(false);
  const handleSignUpModalShow = () => setSignUpModalShow(true);

  const handleInfoModalClose = () => {
    setInfoModalShow(false);
    history.replace('/');
  };

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container fluid>
          <Link to={'/'} className='navi-home text-reset'>
            <Navbar.Text className='text-dark fs-4'>
              CLOSEMEMO <sup>beta</sup>
            </Navbar.Text>
          </Link>
          <div className='d-flex mx-3'>
            <div className='vr' />
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-between'>
            <Nav>
              <Button variant='outline-success' className='w-100'
                      onClick={handleCategoryOffcanvasShow}>도움말</Button>
            </Nav>
            <Form id='mainSearch' className='d-flex my-1' onSubmit={submitForm}>
              <FormControl
                type='search'
                placeholder='(태그 검색)'
                className='mr-2'
                value={query}
                onChange={handleQueryChange}
                disabled={!isLoggedIn}
              />
              <Button variant='outline-success' type='submit' disabled={!isLoggedIn}>🔍</Button>
            </Form>
            <Nav className='flex-row'>
              {isLoggedIn
                ? (<Button variant='outline-success' className='w-100 navi-btn'
                           onClick={handleSettingOffcanvasShow}>설정</Button>)
                : (
                  <>
                    <Button variant='outline-success' className='w-100 navi-btn'
                            onClick={handleLoginModalShow}>로그인</Button>
                    <Button variant='outline-success' className='w-100 ms-1 navi-btn'
                            onClick={handleSignUpModalShow}>가입</Button>
                  </>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <HelpOffcanvas show={categoryOffcanvasShow} handleClose={handleCategoryOffcanvasClose} />
      <SettingOffcanvas show={settingOffcanvasShow} handleClose={handleSettingOffcanvasClose} />
      <LoginModal modalShow={loginModalShow} modalClose={handleLoginModalClose} />
      <SignupModal modalShow={signUpModalShow} modalClose={handleSignUpModalClose} />
      <Modal show={infoModalShow} onHide={handleInfoModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{infoModalContent}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navigation;
