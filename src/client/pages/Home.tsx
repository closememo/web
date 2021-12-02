import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from 'react-bootstrap';
import 'client/css/pages/Home.css';
import Navigation from 'client/components/Navigation';
import LocalPage from 'client/components/local/LocalPage';
import MainPage from 'client/components/MainPage';
import { useGetLoggedInUserQuery } from 'apollo/generated/hooks';
import Information from 'client/components/Information';

function HomePage({ location }: { location: Location }) {

  const search = location.search;
  const params = new URLSearchParams(search);
  const state = params.get('state');
  const page: number = parseInt(params.get('page') as string) || 1;

  const { data, error, loading } = useGetLoggedInUserQuery();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const isLoggedIn: boolean = data.me.isLoggedIn;

  return (
    <>
      <Helmet>
        <title>홈</title>
      </Helmet>
      <Navigation isLoggedIn={isLoggedIn} />
      {!!state && <Information state={state} isLoggedIn={isLoggedIn} />}
      <Container as='main' className='home-main'>
        {isLoggedIn
          ? <MainPage currentPage={page} />
          : <LocalPage />}
      </Container>
    </>
  );
}

export default HomePage;
