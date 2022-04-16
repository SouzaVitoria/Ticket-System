import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import Table from "./Tickets/Table/Table";
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./styles.css";
import { useState } from "react";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Meu Perfil">
          <FiMessageSquare size={25} />
        </Title>

        <div className="container dashboard">
          {tickets.length === 0 ? (
            <>
              <span> Nenhum chamado registrado. </span>
              <Link to="/new-ticket" className="new-ticket">
                <FiPlus size={25} color="#FFF" />
                Novo chamado
              </Link>
            </>
          ) : (
            <>
              <Link to="/new-ticket" className="new-ticket">
                <FiPlus size={25} color="#FFF" />
                Novo chamado
              </Link>
              <Table />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
