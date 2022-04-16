import { Switch } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import Route from "./Route";
import Profile from "../pages/Profile/Profile";
import Customers from "../pages/Customers/Customers";
import NewTicket from "../pages/Dashboard/Tickets/New/NewTicket";

const RoutesAll = () => {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
      <Route exact path="/customers" component={Customers} isPrivate />
      <Route exact path="/new-ticket" component={NewTicket} isPrivate />
    </Switch>
  );
};

export default RoutesAll;
