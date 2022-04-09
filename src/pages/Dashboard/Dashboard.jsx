import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import Header from "../../components/Header/Header";

const Dashboard = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <div className="Dashboard">
      <Header />
    </div>
  );
};

export default Dashboard;
