import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/Auth";
import RoutesAll from "./routes";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} theme="colored" />
        <RoutesAll />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
