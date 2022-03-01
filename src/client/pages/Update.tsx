import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { Container } from 'react-bootstrap';
import PostForm from 'client/components/PostForm';
import { useParams } from 'react-router-dom';
import { useGetCurrentCategoryQuery, useGetLoggedInUserQuery, useGetPostQuery } from 'apollo/generated/hooks';
import FixedMenu from 'client/components/FixedMenu';

function Update() {

  const { id }: { id: string } = useParams();

  const loggedInUserQueryResult = useGetLoggedInUserQuery();
  const currentCategoryQueryResult = useGetCurrentCategoryQuery();
  const postQueryResult = useGetPostQuery({
    variables: { id },
  });

  if (loggedInUserQueryResult.loading || postQueryResult.loading) return <p>Loading...</p>;
  if (loggedInUserQueryResult.error || !loggedInUserQueryResult.data) return <p>Error</p>;
  if (postQueryResult.error || !postQueryResult.data) return <p>Error</p>;

  const isLoggedIn: boolean = loggedInUserQueryResult.data.me.isLoggedIn;
  const categoryId: string | null | undefined = currentCategoryQueryResult.data?.currentCategory;
  const { title, content, tags, option } = postQueryResult.data.post;

  return (
    <>
      <Helmet>
        <title>메모 수정</title>
      </Helmet>
      <Navigation categoryId={categoryId} isLoggedIn={isLoggedIn} />
      <Container as='main' className='home-main'>
        <PostForm categoryId={categoryId} id={id} currentTitle={title} currentContent={content}
                  currentTags={tags} currentOption={option} />
      </Container>
      <FixedMenu isLoggedIn={isLoggedIn} />
    </>
  );
}

export default Update;

