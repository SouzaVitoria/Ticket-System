import React, { useState, useContext } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";

import { AuthContext } from "../../contexts/Auth";

import "./styles.css";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import avatar from "../../assets/avatar.png";

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl);

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Meu Perfil">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>
              <input type="file" accept="image/*" /> <br />
              {!avatarUrl ? (
                <img
                  src={avatar}
                  alt="Foto do perfil do usuário"
                  width="250"
                  height="250"
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto do perfil do usuário"
                  width="250"
                  height="250"
                />
              )}
            </label>
            <label>
              Nome <br />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </label>
            <label>
              E-mail <br />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled
              />
            </label>
            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button
            className="logout-btn"
            onClick={() => {
              signOut();
            }}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
