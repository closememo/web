import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { Container } from 'react-bootstrap';
import FixedMenu from 'client/components/FixedMenu';
import { useGetCurrentCategoryQuery, useGetLoggedInUserQuery } from 'apollo/generated/hooks';
import SearchMain from 'client/components/SearchMain';

function Search({ location }: { location: Location }) {

  const search = location.search;
  const tag = new URLSearchParams(search).get('tag');

  const loggedInUserQueryResult = useGetLoggedInUserQuery();
  const currentCategoryQueryResult = useGetCurrentCategoryQuery();

  if (loggedInUserQueryResult.loading) return <p>Loading...</p>;
  if (loggedInUserQueryResult.error || !loggedInUserQueryResult.data) return <p>Error</p>;

  const isLoggedIn: boolean = loggedInUserQueryResult.data.me.isLoggedIn;
  const isTempUser: boolean | null | undefined = loggedInUserQueryResult.data.me.isTempUser; // TODO: tempUser 제거
  const categoryId: string | null | undefined = currentCategoryQueryResult.data?.currentCategory;

  return (
    <>
      <Helmet>
        <title>검색</title>
      </Helmet>
      <Navigation categoryId={categoryId} isLoggedIn={isLoggedIn} isTempUser={!!isTempUser} />
      <Container as='main' className='home-main'>
        <SearchMain tag={tag} isTempUser={!!isTempUser}/>
      </Container>
      <FixedMenu isLoggedIn={isLoggedIn} />
    </>
  );
}

export default Search;
