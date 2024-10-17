import { BrowserRouter, Redirect, Route } from "react-router-dom";
import routes from "./routes";
import DashboardPage from "~/pages/Dashboard";
import NewUserPage from "~/pages/NewUser";

const Router = () => {
  return (
    <div style={{ marginTop: 64 }}>
      <BrowserRouter>
        <Route exact path={routes.dashboard} component={DashboardPage} />
        <Route exact path={routes.newUser} component={NewUserPage} />

        <Route exact path="*">
          <Redirect to={routes.dashboard} />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default Router;
