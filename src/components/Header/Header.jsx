import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

import "./styles.css";
import logoAvatar from "../../assets/avatar.png";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatarUrl === null ? logoAvatar : user.avatarUrl}
          alt="Foto Usuário"
        />
      </div>
      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        Chamados
      </Link>
      <Link to="/customers">
        <FiUser color="#FFF" size={24} />
        Clientes
      </Link>
      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />
        Perfil
      </Link>
    </div>
  );
};

export default Header;
