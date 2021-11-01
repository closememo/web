import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { Container } from 'react-bootstrap';
import WritePost from 'client/components/WritePost';
import { useParams } from 'react-router-dom';
import { useGetLoggedInUserQuery } from 'apollo/generated/hooks';

function Update() {

  const { id }: { id: string } = useParams();
  const { data, error, loading } = useGetLoggedInUserQuery();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const isLoggedIn: boolean = data.me.isLoggedIn;

  return (
    <>
      <Helmet>
        <title>메모 수정</title>
      </Helmet>
      <Navigation isLoggedIn={isLoggedIn} />
      <Container as='main'>
        <WritePost id={id} />
      </Container>
    </>
  );
}

export default Update;

