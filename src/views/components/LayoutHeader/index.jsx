import React from 'react';

import { Navbar } from 'react-bootstrap';

import style from './style.scss';

const LayoutHeader = ({ title }) =>
  <div className={style.root}>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        {title}
      </Navbar.Brand>
    </Navbar>
  </div>;

export default LayoutHeader;
