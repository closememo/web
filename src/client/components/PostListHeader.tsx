import React, { ChangeEvent } from 'react';
import { Button, Col, Collapse, Form, Row } from 'react-bootstrap';
import PersonalLocalCache from 'client/cache/PersonalLocalCache';
import { useHistory } from 'react-router-dom';
import PagePaths from 'client/constants/PagePaths';
import { useUpdateAccountOptionMutation } from 'apollo/generated/hooks';


interface PostListHeaderParams {
  heading: string;
  currentPage?: number;
  categoryId?: string | null;
  orderOptionOpen: boolean;
  setOrderOptionOpen: Function;
  postCount: number;
  currentOrderType: string;
  refetchPosts?: Function;
}

function PostListHeader({
                          heading,
                          currentPage,
                          categoryId,
                          orderOptionOpen,
                          setOrderOptionOpen,
                          postCount,
                          currentOrderType,
                          refetchPosts,
                        }: PostListHeaderParams) {

  const history = useHistory();

  const [updateAccountOption, updateAccountOptionResult] = useUpdateAccountOptionMutation();

  const handleOrderOptionOpen = async () => {
    await PersonalLocalCache.setOrderOptionOpen(!orderOptionOpen);
    setOrderOptionOpen(!orderOptionOpen);
  };

  const handlePostCount = async (event: ChangeEvent) => {
    const newPostCount = parseInt((event.target as HTMLInputElement).value);
    updateAccountOption({ variables: { documentCount: newPostCount } })
      .then(() => {
        const cache = updateAccountOptionResult.client.cache;
        cache.modify({
          id: cache.identify({ __typename: 'User', id: 'ME' }),
          fields: {
            documentCount(): number {
              return newPostCount;
            },
          },
        });
      });
    history.push(PagePaths.Home);
  };

  const handleOrderType = async (event: ChangeEvent) => {
    const newOrderType = (event.target as HTMLInputElement).value;
    updateAccountOption({ variables: { documentOrderType: newOrderType } })
      .then(() => {
        const cache = updateAccountOptionResult.client.cache;
        cache.modify({
          id: cache.identify({ __typename: 'User', id: 'ME' }),
          fields: {
            documentOrderType(): string {
              return newOrderType;
            },
          },
        });
      });
    if (!!refetchPosts) {
      refetchPosts({
        page: currentPage,
        limit: postCount,
        ...(!!categoryId && { categoryId: categoryId }),
        orderType: newOrderType,
      });
    }
  };

  return (
    <>
      <div className='d-flex mt-4'>
        <h2>{heading}</h2>
        {orderOptionOpen
          ? <Button variant='outline-dark' className='ms-auto' size='sm'
                    onClick={handleOrderOptionOpen}>▲</Button>
          : <Button variant='outline-dark' className='ms-auto' size='sm'
                    onClick={handleOrderOptionOpen}>▼</Button>}
      </div>
      <Collapse className='my-1' in={orderOptionOpen}>
        <Row>
          <Form.Label column sm='2'>
            표시 개수
          </Form.Label>
          <Col sm='4' className='mb-1'>
            <Form.Select value={postCount} onChange={handlePostCount}>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </Form.Select>
          </Col>
          <Form.Label column sm='2'>
            정렬
          </Form.Label>
          <Col sm='4' className='mb-1'>
            <Form.Select value={currentOrderType} onChange={handleOrderType}>
              <option value='CREATED_NEWEST'>생성일 최신순</option>
              <option value='CREATED_OLDEST'>생성일 오래된순</option>
              <option value='UPDATED_NEWEST'>수정일 최신순</option>
            </Form.Select>
          </Col>
        </Row>
      </Collapse>
    </>
  );
}

export default PostListHeader;
