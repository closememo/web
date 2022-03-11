import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { Container } from 'react-bootstrap';
import PostForm from 'client/components/PostForm';
import { useGetCurrentCategoryQuery, useGetLoggedInUserQuery } from 'apollo/generated/hooks';
import FixedMenu from 'client/components/FixedMenu';

function Write() {

  const { data, error, loading } = useGetLoggedInUserQuery();
  const currentCategoryQueryResult = useGetCurrentCategoryQuery();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const isLoggedIn: boolean = data.me.isLoggedIn;
  const isTempUser: boolean | null | undefined = data.me.isTempUser; // TODO: tempUser 제거
  const recentlyViewedCategoryId: string | null | undefined = data.me.recentlyViewedCategoryId;
  const categoryId: string | null | undefined = currentCategoryQueryResult.data?.currentCategory;

  const currentCategoryId = categoryId || recentlyViewedCategoryId; // TODO: 변수 하나로 통일

  return (
    <>
      <Helmet>
        <title>새 메모 작성</title>
      </Helmet>
      <Navigation categoryId={currentCategoryId} isLoggedIn={isLoggedIn} isTempUser={!!isTempUser} />
      <Container as='main' className='home-main'>
        <PostForm categoryId={currentCategoryId} />
      </Container>
      <FixedMenu isLoggedIn={isLoggedIn} />
    </>
  );
}

export default Write;
