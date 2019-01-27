import React, { Component } from 'react';

// components
import ContentWrapper from '../components/ContentWrapper';
import LayoutHeader from '../components/LayoutHeader';

const AppLayout = ({ children }) =>
  <div>
    <LayoutHeader title="Pokedex" />

    <ContentWrapper>
      {children}
    </ContentWrapper>
  </div>

export default AppLayout;
