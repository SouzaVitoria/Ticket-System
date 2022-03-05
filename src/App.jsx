import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/Auth";
import RoutesAll from "./routes";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesAll />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
