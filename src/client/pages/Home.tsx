import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from 'react-bootstrap';
import 'client/css/pages/Home.css';
import Navigation from 'client/components/Navigation';
import LocalPage from 'client/components/local/LocalPage';
import PostList from 'client/components/PostList';
import { useGetLoggedInUserQuery } from 'apollo/generated/hooks';

function HomePage() {

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
      <Container as='main' className='home-main'>
        {isLoggedIn
          ? <PostList />
          : <LocalPage />}
      </Container>
    </>
  );
}

export default HomePage;
