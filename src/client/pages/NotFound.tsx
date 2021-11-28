import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { useGetLoggedInUserQuery } from 'apollo/generated/hooks';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';

function NotFound() {

  const { data, error, loading } = useGetLoggedInUserQuery();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const isLoggedIn: boolean = data.me.isLoggedIn;

  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <Navigation isLoggedIn={isLoggedIn} />
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
    </>
  );
}

export default NotFound;
