import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from 'react-bootstrap';
import 'client/css/pages/Home.css';
import Navigation from 'client/components/Navigation';
import LocalPage from 'client/components/local/LocalPage';
import MainPage from 'client/components/MainPage';
import { useGetCurrentCategoryQuery, useGetLoggedInUserQuery } from 'apollo/generated/hooks';
import Information from 'client/components/Information';
import FixedMenu from 'client/components/FixedMenu';
import Pagination from 'client/constants/Pagination';
import NotificationModal from 'client/components/modal/NotificationModal';

function HomePage({ location }: { location: Location }) {

  const search = location.search;
  const params = new URLSearchParams(search);
  const state = params.get('state');
  const page: number = parseInt(params.get('page') as string) || 1;

  const { data, error, loading } = useGetLoggedInUserQuery();
  const currentCategoryQueryResult = useGetCurrentCategoryQuery();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const isLoggedIn: boolean = data.me.isLoggedIn;
  const isTempUser: boolean | null | undefined = data.me.isTempUser; // TODO: tempUser 제거
  const documentOrderType: string = !data.me.documentOrderType
    ? 'CREATED_NEWEST' : data.me.documentOrderType;
  const documentCount: number = (!data.me.documentCount || data.me.documentCount < 5)
    ? Pagination.PAGE_NUMBER : data.me.documentCount;
  const recentlyViewedCategoryId: string | null | undefined = data.me.recentlyViewedCategoryId;
  const categoryId: string | null | undefined = currentCategoryQueryResult.data?.currentCategory;

  const currentCategoryId = categoryId || recentlyViewedCategoryId; // TODO: 변수 하나로 통일

  return (
    <>
      <Helmet>
        <title>홈</title>
      </Helmet>
      <Navigation categoryId={currentCategoryId} isLoggedIn={isLoggedIn} isTempUser={!!isTempUser} />
      {!!state && <Information state={state} isLoggedIn={isLoggedIn} />}
      <Container as='main' className='home-main'>
        {isLoggedIn
          ? <>
            <MainPage isTempUser={isTempUser} categoryId={currentCategoryId} currentPage={page}
                      documentOrderType={documentOrderType} documentCount={documentCount} />
            <NotificationModal />
          </>
          : <LocalPage />}
      </Container>
      <FixedMenu isLoggedIn={isLoggedIn} />
    </>
  );
}

export default HomePage;
