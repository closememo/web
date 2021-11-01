import React, { MouseEvent } from 'react';
import { ListGroup } from 'react-bootstrap';

const PREVIEW_LIMIT = 150;

function LocalList({ posts, setCurrentId }: { posts: any[], setCurrentId: Function }) {

  const handleItemClick = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    setCurrentId(id);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className='py-2'>
        <ListGroup>
          {posts && posts.map((post: any) => (
            <ListGroup.Item key={post.id} action variant='light' className='list-group-item-action'
                            onClick={(event: MouseEvent) => handleItemClick(event, post.id)}>
              <div className='d-flex w-100'>
                {getTitleTag(post.title)}
                <small className='ms-auto'>{convertToFormattedDate(post.id)}</small>
              </div>
              <small className='me-auto two-line-truncate'>{getPreviewContent(post.content)}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

function getTitleTag(title: string): JSX.Element {
  if (!title) {
    return <h5 className='mb-1'>(제목없음)</h5>;
  } else {
    return <h5 className='mb-1 text-dark text-truncate'>{title}</h5>;
  }
}

function getPreviewContent(content: string): string {
  const replacedContent = content.replace(/[\r\n]+/g, ' ');
  return replacedContent.length <= PREVIEW_LIMIT
    ? replacedContent
    : replacedContent.substr(0, PREVIEW_LIMIT) + '...';
}

function convertToFormattedDate(id: string): string {
  const pattern = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/i;
  const result = id.match(pattern) as RegExpMatchArray;

  if (result === null) {
    return '';
  }

  const YYYY = result[1];
  const MM = result[2];
  const dd = result[3];
  const hh = result[4];
  const mm = result[5];
  const ss = result[6];

  return YYYY + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
}

export default LocalList;
