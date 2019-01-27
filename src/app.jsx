import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

// config
import './config/promise';
import './config/api';
import './config/models';

// stylesheets
import '../stylesheets/index.scss';

//import route
import AppRoutes from 'routes';


ReactDOM.render(
  <AppRoutes />,
  document.getElementById('app-container'),
);
