import React from 'react';
import 'client/css/pages/App.css';
import { renderRoutes } from 'react-router-config';
import router from 'client/routes';

function App() {
  return (
    <>
      {renderRoutes(router)}
    </>
  );
}

export default App;
