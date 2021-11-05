import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from 'client/components/Navigation';
import { Container } from 'react-bootstrap';
import PostForm from 'client/components/PostForm';
import { useParams } from 'react-router-dom';
import { useGetLoggedInUserQuery, useGetPostQuery } from 'apollo/generated/hooks';

function Update() {

  const { id }: { id: string } = useParams();

  const loggedInUserQueryResult = useGetLoggedInUserQuery();
  const postQueryResult = useGetPostQuery({
    variables: { id },
  });

  if (loggedInUserQueryResult.loading || postQueryResult.loading) return <p>Loading...</p>;
  if (loggedInUserQueryResult.error || !loggedInUserQueryResult.data) return <p>Error</p>;
  if (postQueryResult.error || !postQueryResult.data) return <p>Error</p>;

  const isLoggedIn: boolean = loggedInUserQueryResult.data.me.isLoggedIn;
  const { title, content, tags } = postQueryResult.data.post;

  return (
    <>
      <Helmet>
        <title>메모 수정</title>
      </Helmet>
      <Navigation isLoggedIn={isLoggedIn} />
      <Container as='main' className='home-main'>
        <PostForm id={id} currentTitle={title} currentContent={content} currentTags={tags} />
      </Container>
    </>
  );
}

export default Update;

