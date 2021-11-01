import React, { useState } from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import HelpOffcanvas from 'client/components/HelpOffcanvas';
import LoginModal from 'client/components/LoginModal';
import SignupModal from 'client/components/SignupModal';
import SettingOffcanvas from 'client/components/SettingOffcanvas';

function Navigation({ isLoggedIn }: { isLoggedIn: boolean }) {

  const [categoryOffcanvasShow, setCategoryOffcanvasShow] = useState(false);
  const [settingOffcanvasShow, setSettingOffcanvasShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);

  const handleCategoryOffcanvasClose = () => setCategoryOffcanvasShow(false);
  const handleCategoryOffcanvasShow = () => setCategoryOffcanvasShow(true);

  const handleSettingOffcanvasClose = () => setSettingOffcanvasShow(false);
  const handleSettingOffcanvasShow = () => setSettingOffcanvasShow(true);

  const handleLoginModalClose = () => setLoginModalShow(false);
  const handleLoginModalShow = () => setLoginModalShow(true);

  const handleSignUpModalClose = () => setSignUpModalShow(false);
  const handleSignUpModalShow = () => setSignUpModalShow(true);

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container fluid>
          <Navbar.Text className='text-dark fs-4'>
            CLOSEMEMO
          </Navbar.Text>
          <div className='d-flex mx-3'>
            <div className='vr' />
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-between'>
            <Nav>
              <Button variant='outline-success' className='w-100'
                      onClick={handleCategoryOffcanvasShow}>도움말</Button>
            </Nav>
            <Form id='mainSearch' className='d-flex my-1'>
              <FormControl
                type='search'
                placeholder='Search'
                className='mr-2'
                disabled={!isLoggedIn}
              />
              <Button variant='outline-success' disabled={!isLoggedIn}>🔍</Button>
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
    </>
  );
}

export default Navigation;
