import React from 'react';
import { Link } from 'react-router-dom';
import PagePaths from '../constants/PagePaths';
import { Helmet } from 'react-helmet-async';

function AdminPage() {
  return (
    <>
      <Helmet>
        <title>어드민</title>
      </Helmet>
      <h2>AdminPage</h2>
      HomePage <Link to={PagePaths.Home}>홈으로</Link>
    </>
  );
}

export default AdminPage;
