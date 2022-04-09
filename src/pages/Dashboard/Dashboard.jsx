import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import Header from "../../components/Header/Header";

const Dashboard = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <div className="Dashboard">
      <Header />
      <button onClick={() => signOut()}> Fazer Logout </button>
    </div>
  );
};

export default Dashboard;
