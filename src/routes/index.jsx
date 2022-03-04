import { Switch } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Route from "./Route";

const RoutesAll = () => {
  console.log("aqui")
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
    </Switch>
  );
}

export default RoutesAll;
