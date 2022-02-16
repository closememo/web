import React, { ChangeEvent } from 'react';
import { Button, Col, Collapse, Form, Row } from 'react-bootstrap';
import PersonalLocalCache from 'client/cache/PersonalLocalCache';
import Pagination from 'client/constants/Pagination';


interface PostListHeaderParams {
  heading: string;
  currentPage?: number;
  categoryId?: string | null;
  orderOptionOpen: boolean;
  setOrderOptionOpen: Function;
  currentOrderType: string;
  setCurrentOrderType: Function;
  refetchPosts?: Function;
}

function PostListHeader({
                          heading,
                          currentPage,
                          categoryId,
                          orderOptionOpen,
                          setOrderOptionOpen,
                          currentOrderType,
                          setCurrentOrderType,
                          refetchPosts,
                        }: PostListHeaderParams) {

  const handleOrderOptionOpen = async () => {
    await PersonalLocalCache.setOrderOptionOpen(!orderOptionOpen)
    setOrderOptionOpen(!orderOptionOpen);
  }

  const handleOrderType = async (event: ChangeEvent) => {
    const orderType = (event.target as HTMLInputElement).value;
    setCurrentOrderType(orderType);
    await PersonalLocalCache.setOrderType(orderType);
    if (!!refetchPosts) {
      refetchPosts({
        page: currentPage,
        limit: Pagination.PAGE_NUMBER,
        ...(!!categoryId && { categoryId: categoryId }),
        orderType: orderType,
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
            정렬
          </Form.Label>
          <Col sm='10' className='mb-1'>
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
