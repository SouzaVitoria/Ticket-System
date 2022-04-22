import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";

const RouteWrapper = ({ component: Component, isPrivate, ...rest }) => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) return <div> Loading... </div>;

  if (!signed && isPrivate) return <Redirect to="/" />;
  if (signed && !isPrivate) return <Redirect to="/dashboard" />;

  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default RouteWrapper;
