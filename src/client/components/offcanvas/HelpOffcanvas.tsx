import { Offcanvas } from 'react-bootstrap';
import React from 'react';

function HelpOffcanvas({ show, handleClose }: { show: boolean, handleClose: Function }) {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>도움말</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <h4>클로즈메모 (closememo)</h4>
        <p className='fw-bold fst-italic'>클로즈메모는 아직 beta 버전 입니다.</p>
        <ul>
          <li>클로즈메모는 간단하게 어디서든 작성할 수 있는 웹메모장입니다.</li>
        </ul>
        <hr />
        <h5>로그인 없이 작성</h5>
        <p>로그인 없이도 메모를 작성/수정 가능합니다.</p>
        <ul>
          <li>메모를 브라우저에 저장합니다.</li>
          <li>"인터넷 사용기록 삭제"시 삭제됩니다.</li>
          <li>서버에 저장하지 않기 때문에 동기화 되지 않습니다.</li>
        </ul>
        <hr />
        <h5>로그인</h5>
        <p>로그인을 하면 메모를 서버에 저장합니다.</p>
        <ul>
          <li>다른 기기로 접근해도 메모를 볼 수 있습니다.</li>
          <li>태그를 추가할 수 있고, 태그 검색 기능을 사용할 수 있습니다.</li>
          <li>사용자를 구분하고 백업을 위해 이메일이 필요합니다.</li>
        </ul>
        <hr />
        <h5>데이터의 처리</h5>
        <ul>
          <li>메모를 이메일로 전송 요청하는 경우 압축 파일로 만들어 메일에 첨부하여 전송합니다.</li>
          <li>삭제 요청 및 탈퇴 시 모든 정보는 즉시 삭제합니다.</li>
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default HelpOffcanvas;
