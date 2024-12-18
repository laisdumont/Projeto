import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

export default () => (
  <BrowserRouter>
    <div className="app">
      <Routes />
    </div>
  </BrowserRouter>
);