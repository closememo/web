import { Offcanvas } from 'react-bootstrap';
import React from 'react';

function HelpOffcanvas({ show, handleClose }: { show: boolean, handleClose: Function }) {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>도움말</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <h5>데모 버전</h5>
        <p>로그인 없이도 데모 버전의 메모를 사용할 수 있습니다.</p>
        <p>데모버전은 데이터를 브라우저에 저장하기 때문에 공유되지 않습니다. </p>
        <hr/>
        <h5>베타 버전</h5>
        <p>현재 기능은 베타버전입니다.</p>
        <p>로그인 후에는 작성한 메모를 서버에 저장합니다. 태그 기능과 검색 기능을 사용할 수 있습니다.</p>
        <hr/>
        <h5>데이터 처리</h5>
        <p>삭제 확인 중 요청시 메일로 전달합니다.</p>
        <p>탈퇴 중 요청시 모든 메모를 메일로 전달합니다.</p>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default HelpOffcanvas;
