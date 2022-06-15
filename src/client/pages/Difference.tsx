import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCurrentCategoryQuery, useGetLoggedInUserQuery } from 'apollo/generated/hooks';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { Container } from 'react-bootstrap';
import DifferenceMain from 'client/components/DifferenceMain';
import FixedMenu from 'client/components/FixedMenu';
import 'client/css/pages/Difference.css';

function Difference() {

  const { differenceId }: { differenceId: string } = useParams();

  const { data, error, loading } = useGetLoggedInUserQuery();
  const currentCategoryQueryResult = useGetCurrentCategoryQuery();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const isLoggedIn: boolean = data.me.isLoggedIn;
  const isTempUser: boolean | null | undefined = data.me.isTempUser; // TODO: tempUser 제거
  const categoryId: string | null | undefined = currentCategoryQueryResult.data?.currentCategory;

  return (
    <>
      <Helmet>
        <title>변경사항</title>
      </Helmet>
      <Navigation categoryId={categoryId} isLoggedIn={isLoggedIn} isTempUser={!!isTempUser} />
      <Container as='main' className='home-main'>
        <DifferenceMain differenceId={differenceId} />
      </Container>
      <FixedMenu isLoggedIn={isLoggedIn} />
    </>
  );
}

export default Difference;
