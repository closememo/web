import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import States from 'client/constants/States';
import { useHistory } from 'react-router-dom';
import { GetPostListDocument, useCreateLocalPostsMutation } from 'apollo/generated/hooks';
import localforage from 'localforage';
import { LocalPost } from 'client/components/local/LocalPage';
import { NewLocalPost } from 'apollo/generated/types';


function Information({ state, isLoggedIn }: { state: string, isLoggedIn: boolean }): JSX.Element {

  const history = useHistory();

  const isBrowser: boolean = typeof (window) !== 'undefined';

  const [infoModalShow, setInfoModalShow] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState('');
  const [waitingModalShow, setWaitingModalShow] = useState(false);
  const [waitingModalContent, setWaitingModalContent] = useState('');

  const [createNewPosts] = useCreateLocalPostsMutation({
    refetchQueries: [
      { query: GetPostListDocument },
    ],
  });

  const pushLocalPost = async () => {
    if (isBrowser) {
      let postIds: string[] | null = await localforage.getItem('postIds');
      if (postIds === null || postIds.length === 0) return;

      const currentPosts: LocalPost[] = await Promise.all(
        postIds.map(async (postId: string) => {
          return await localforage.getItem(postId) as LocalPost;
        }),
      );

      const newLocalPosts: NewLocalPost[] | undefined = currentPosts.map(post => {
        return {
          title: post.title,
          content: post.content,
          localFormedDateString: post.id,
        };
      });

      const result = await createNewPosts({
        variables: { newLocalPosts: newLocalPosts },
      });
      console.log(JSON.stringify(result));
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setInfoModalShow(true);
      switch (state) {
        case States.NEED_REGISTER:
          setInfoModalShow(true);
          setInfoModalContent('계정이 존재하지 않습니다. 먼저 가입해 주세요.');
          break;
        case States.JUST_REGISTERED:
          setInfoModalShow(true);
          setInfoModalContent('로그인 해 주세요.');
      }
    } else {
      switch (state) {
        case States.LOCAL_PUSH:
          setWaitingModalShow(true);
          setWaitingModalContent('로컬 메모를 업로드 중입니다.');
          pushLocalPost().then(() => {
            setWaitingModalShow(false);
            history.replace('/');

            localforage.getItem('postIds').then((postIds) => {
              if (postIds !== null) {
                (postIds as string[]).map((postId: string) => {
                  localforage.removeItem(postId).then();
                });
              }
            });
            localforage.removeItem('postIds').then();
          });
          break;
        default:
          history.replace('/');
      }
    }
  }, []);

  const handleInfoModalClose = () => {
    setInfoModalShow(false);
    history.replace('/');
  };

  const handleWaitingModalClose = () => {
    setWaitingModalShow(false);
    history.replace('/');
  };

  return (
    <>
      <Modal show={infoModalShow} onHide={handleInfoModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{infoModalContent}</p>
        </Modal.Body>
      </Modal>
      <Modal show={waitingModalShow} onHide={handleWaitingModalClose}
             backdrop='static' keyboard={false}>
        <Modal.Header>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{waitingModalContent}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Information;