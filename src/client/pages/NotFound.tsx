import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { useGetCurrentCategoryQuery, useGetLoggedInUserQuery } from 'apollo/generated/hooks';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import FixedMenu from 'client/components/FixedMenu';

function NotFound() {

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
        <title>Page Not Found</title>
      </Helmet>
      <Navigation categoryId={categoryId} isLoggedIn={isLoggedIn} isTempUser={!!isTempUser} />
      <Container as='main' className='home-main'>
        <div className='my-4'>
          <Route
            render={({ staticContext }) => {
              if (staticContext) staticContext.statusCode = 404;
              return <h1>Page Not Found.</h1>;
            }}
          />
        </div>
      </Container>
      <FixedMenu isLoggedIn={isLoggedIn} />
    </>
  );
}

export default NotFound;
