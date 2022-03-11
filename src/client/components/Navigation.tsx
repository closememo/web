import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Container, Form, FormControl, Image, Nav, Navbar } from 'react-bootstrap';
import MainLogo from 'public/img/logo.png';
import HelpOffcanvas from 'client/components/offcanvas/HelpOffcanvas';
import LoginModal from 'client/components/modal/LoginModal';
import SettingOffcanvas from 'client/components/offcanvas/SettingOffcanvas';
import { Link, useHistory } from 'react-router-dom';
import PagePaths from 'client/constants/PagePaths';
import CategoryOffcanvas from 'client/components/offcanvas/CategoryOffcanvas';
import { useGetCategoriesQuery } from 'apollo/generated/hooks';
import { Category } from 'apollo/generated/types';

interface NavigationParams {
  categoryId?: string | null;
  isLoggedIn: boolean;
  isTempUser: boolean; // TODO: tempUser 제거
}

function Navigation({ categoryId, isLoggedIn, isTempUser }: NavigationParams) {

  const history = useHistory();

  let getCategoriesQueryResult;
  let categories: Category[] | undefined;
  if (isLoggedIn) {
    getCategoriesQueryResult = useGetCategoriesQuery();
    categories = getCategoriesQueryResult.data?.categories;
  }

  const [query, setQuery] = useState('');

  const [leftOffcanvasShow, setLeftOffcanvasShow] = useState(false);
  const [needToBeExpanded, setNeedToBeExpanded] = useState<string[]>([]);
  const [needToBeSelected, setNeedToBeSelected] = useState<string[]>([]);
  const [settingOffcanvasShow, setSettingOffcanvasShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);

  const handleQueryChange = (event: ChangeEvent) => {
    setQuery((event.target as HTMLInputElement).value);
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    history.push('/search?tag=' + query);
  };

  const handleLeftOffcanvasClose = () => setLeftOffcanvasShow(false);
  const handleLeftOffcanvasShow = () => {
    setNeedToBeSelected((!!categoryId) ? [categoryId] : []);
    setNeedToBeExpanded(getIdsNeedToBeExpanded(categoryId, categories));
    setLeftOffcanvasShow(true);
  };

  const handleSettingOffcanvasClose = () => setSettingOffcanvasShow(false);
  const handleSettingOffcanvasShow = () => setSettingOffcanvasShow(true);

  const handleLoginModalClose = () => setLoginModalShow(false);
  const handleLoginModalShow = () => setLoginModalShow(true);

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container fluid>
          <Link to={PagePaths.Home} className='navi-home'>
            <Navbar.Brand className='me-0'>
              <Image src={MainLogo} className='main-logo' />
              <span className='text-dark'> <sup>beta</sup></span>
            </Navbar.Brand>
          </Link>
          <div className='d-flex mx-3'>
            <div className='vr' />
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-between'>
            <Nav className='my-1'>
              <Button variant='outline-success' className='w-100'
                      onClick={handleLeftOffcanvasShow}>{isLoggedIn ? '카테고리' : '도움말'}</Button>
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
            <Nav className='flex-row my-1'>
              {isLoggedIn
                ? <Button variant='outline-success' className='w-100 navi-btn'
                          onClick={handleSettingOffcanvasShow}>설정</Button>
                : <Button variant='outline-success' className='w-100 navi-btn'
                          onClick={handleLoginModalShow}>로그인</Button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isTempUser ? <div className='bg-warning'>테스트 계정으로 로그인</div> : <></>}
      {isLoggedIn
        ? <CategoryOffcanvas show={leftOffcanvasShow} handleClose={handleLeftOffcanvasClose}
                             categoryId={categoryId} categories={categories}
                             needToBeSelected={needToBeSelected} needToBeExpanded={needToBeExpanded} />
        : <HelpOffcanvas show={leftOffcanvasShow} handleClose={handleLeftOffcanvasClose} />}
      <SettingOffcanvas show={settingOffcanvasShow} handleClose={handleSettingOffcanvasClose}
                        isTempUser={isTempUser}/>
      <LoginModal isShow={loginModalShow} closeModal={handleLoginModalClose} />
    </>
  );
}

function getIdsNeedToBeExpanded(categoryId: string | null | undefined, categories: Category[] | undefined) {
  if (!categoryId || !categories) return [];
  let needToExpand: string[] = [categoryId];
  let cursorId: string = categoryId;
  while (true) {
    const parent: Category | undefined = categories.find(category => {
      if (!category.childrenIds) return false;
      return category.childrenIds.includes(cursorId);
    });
    if (!parent) break;
    needToExpand.push(parent.id);
    cursorId = parent.id;
  }
  return needToExpand;
}

export default Navigation;
