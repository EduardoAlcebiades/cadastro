import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Success from "./pages/Success";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/success/t/:timestamps" component={Success} exact />

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
