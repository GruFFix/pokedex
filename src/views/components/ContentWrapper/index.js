import React from 'react';

import style from './style.scss';

const ContentWrapper = ({ children }) =>
  <div className={style.root}>
    {children}
  </div>;

export default ContentWrapper;
