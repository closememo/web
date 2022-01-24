import React from 'react';
import { useGetCurrentCategoryQuery, useGetLoggedInUserQuery } from 'apollo/generated/hooks';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { Container } from 'react-bootstrap';
import SuggestionForm from 'client/components/SuggestionForm';

function Suggestion() {

  const { data, error, loading } = useGetLoggedInUserQuery();
  const currentCategoryQueryResult = useGetCurrentCategoryQuery();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const isLoggedIn: boolean = data.me.isLoggedIn;
  const categoryId: string | null | undefined = currentCategoryQueryResult.data?.currentCategory;

  return (
    <>
      <Helmet>
        <title>건의</title>
      </Helmet>
      <Navigation categoryId={categoryId} isLoggedIn={isLoggedIn} />
      <Container as='main' className='home-main'>
        <SuggestionForm />
      </Container>
    </>
  );
}

export default Suggestion;