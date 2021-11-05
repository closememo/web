import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { Container } from 'react-bootstrap';
import PostForm from 'client/components/PostForm';
import { useGetLoggedInUserQuery } from 'apollo/generated/hooks';

function Write() {

  const { data, error, loading } = useGetLoggedInUserQuery();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const isLoggedIn: boolean = data.me.isLoggedIn;

  return (
    <>
      <Helmet>
        <title>새 메모 작성</title>
      </Helmet>
      <Navigation isLoggedIn={isLoggedIn} />
      <Container as='main' className='home-main'>
        <PostForm />
      </Container>
    </>
  );
}

export default Write;
