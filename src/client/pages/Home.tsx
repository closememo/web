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
  const categoryId: string | null | undefined = currentCategoryQueryResult.data?.currentCategory;

  return (
    <>
      <Helmet>
        <title>홈</title>
      </Helmet>
      <Navigation categoryId={categoryId} isLoggedIn={isLoggedIn} />
      {!!state && <Information state={state} isLoggedIn={isLoggedIn} />}
      <Container as='main' className='home-main'>
        {isLoggedIn
          ? <MainPage categoryId={categoryId} currentPage={page} />
          : <LocalPage />}
      </Container>
      <FixedMenu />
    </>
  );
}

export default HomePage;
