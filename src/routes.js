import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// layouts
import ApplicationLayout from 'views/layout';

// pages
import PokemonListPage from 'views/pages/PokemonListPage';

export default () =>
  <Router>
    <Switch>
      <CommonLayout
        exact
        name="Pokemon list"
        path="/"
        component={PokemonListPage}
        showHeader
      />
    </Switch>
  </Router>;

function CommonLayout({ component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={componentProps =>
        <ApplicationLayout>
          <Component {...componentProps} {...props} />
        </ApplicationLayout>}
    />
  );
}
