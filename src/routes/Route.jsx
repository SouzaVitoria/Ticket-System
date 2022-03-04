import { Route, Redirect } from "react-router-dom"

const RouteWrapper = ({
  component: Component,
  isPrivate,
  ...rest
}) => {

  const loading = false;
  const signed = false;

  if (loading) return <div> Loading... </div>

  if (!signed && isPrivate) return <Redirect to="/" />
  if (signed && !isPrivate) return <Redirect to="/dashboard" />

  return (
    <Route
      {...rest}
      render={props => {
        return <Component {...props} />
      }}
    />
  );
}

export default RouteWrapper;