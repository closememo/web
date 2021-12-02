import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PagePaths from 'client/constants/PagePaths';

function PagingHandle({ total, currentPage, pageSize }: { total: number, currentPage: number, pageSize: number }) {

  const lastPage = Math.ceil(total / pageSize);

  return (
    <div>
      <Pagination className='justify-content-center'>
        {getPaginationItems(currentPage, lastPage)}
      </Pagination>
    </div>
  );
}

function getPaginationItems(currentPage: number, lastPage: number) {

  if (lastPage <= 5) {
    return (
      <>
        {[...Array(lastPage).keys()].map((index) => (
          <PaginationItem page={index + 1} />
        ))}
      </>
    );
  }

  return (
    <>
      {currentPage > 2 && <PaginationItem page={1} />}
      {currentPage > 3 && <Pagination.Ellipsis disabled />}
      {getCurrentPaginationBlock(currentPage, lastPage)}
      {(currentPage < lastPage - 2) && <Pagination.Ellipsis disabled />}
      {(currentPage < lastPage - 1) && <PaginationItem page={lastPage} />}
    </>
  );
}

function getCurrentPaginationBlock(currentPage: number, lastPage: number): JSX.Element {

  const { startNumber, activeItem } = ((currentPage: number, lastPage: number) => {
    if (currentPage === 1) {
      return { startNumber: 1, activeItem: 0 };
    } else if (currentPage < lastPage) {
      return { startNumber: currentPage - 1, activeItem: 1 };
    } else {
      return { startNumber: lastPage - 2, activeItem: 2 };
    }
  })(currentPage, lastPage);

  return (
    <>
      {[...Array(3).keys()].map((index) => (
        <PaginationItem key={'page_' + index} page={startNumber + index} isActive={activeItem === index} />
      ))}
    </>
  );
}

function PaginationItem({ page, isActive }: { page: number, isActive?: boolean }): JSX.Element {
  const history = useHistory();

  return (
    <Pagination.Item active={!!isActive} key={'item_' + page}
                     onClick={() => history.push(PagePaths.Home + '?page=' + page)}>
      {page}
    </Pagination.Item>
  );
}

export default PagingHandle;
