import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes.js";

import { AppFooter } from "./cmps/AppFooter.jsx";

export class RootCmp extends React.Component {
  render() {
    return (
      <section>
        <main>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                exact
                component={route.component}
                path={route.path}
              />
            ))}
          </Switch>
        </main>
        <AppFooter />
      </section>
    );
  }
}
