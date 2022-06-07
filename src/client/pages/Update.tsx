import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetLoggedInUserQuery } from 'apollo/generated/hooks';
import FixedMenu from 'client/components/FixedMenu';
import UpdateMain from 'client/components/UpdateMain';

function Update() {

  const { id }: { id: string } = useParams();

  const [categoryId, setCategoryId] = useState<string | null>(null);

  const loggedInUserQueryResult = useGetLoggedInUserQuery();

  if (loggedInUserQueryResult.loading) return <p>Loading...</p>;
  if (loggedInUserQueryResult.error || !loggedInUserQueryResult.data) return <p>Error</p>;

  const isLoggedIn: boolean = loggedInUserQueryResult.data.me.isLoggedIn;
  const isTempUser: boolean | null | undefined = loggedInUserQueryResult.data.me.isTempUser; // TODO: tempUser 제거

  return (
    <>
      <Helmet>
        <title>메모 수정</title>
      </Helmet>
      <Navigation categoryId={categoryId} isLoggedIn={isLoggedIn} isTempUser={!!isTempUser} />
      <Container as='main' className='home-main'>
        <UpdateMain id={id} setCategoryId={setCategoryId}/>
      </Container>
      <FixedMenu isLoggedIn={isLoggedIn} />
    </>
  );
}

export default Update;

