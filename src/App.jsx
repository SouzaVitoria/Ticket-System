import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/Auth";
import RoutesAll from "./routes";
import ModalProvider from "./contexts/Modal";

const App = () => {
  return (
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <ToastContainer autoClose={3000} theme="colored" />
          <RoutesAll />
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
};

export default App;
