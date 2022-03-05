import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

const Dashboard = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <div className="Dashboard">
      <button onClick={() => signOut()}> Fazer Logout </button>
    </div>
  );
};

export default Dashboard;
