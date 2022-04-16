import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Header from "../../../../components/Header/Header";
import Title from "../../../../components/Title/Title";
import "./styles.css";

export default function NewTicket() {
  const [subject, setSubject] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [complement, setComplement] = useState("");

  const handleRegister = e => {
    e.preventDefault();
  };

  const handleChangeSelect = e => {
    setSubject(e.target.value);
  };

  const handleOptionChange = e => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Novo chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container new-ticket">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>
              Cliente <br />
              <select>
                <option key={1} value={1}>
                  Escola
                </option>
              </select>
            </label>
            <label>
              Assunto <br />
              <select value={subject} onChange={handleChangeSelect}>
                <option value="Suporte">Suporte</option>
                <option value="Visita Técnica">Visita Técnica</option>
                <option value="Financeiro">Financeiro</option>
              </select>
            </label>
            <div className="status">
              <label> Status </label> <br />
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="Aberto"
                  onChange={handleOptionChange}
                  checked={status === "Aberto"}
                />
                <span>Em aberto</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="Progresso"
                  onChange={handleOptionChange}
                  checked={status === "Progresso"}
                />
                <span>Em andamento</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="Finalizado"
                  onChange={handleOptionChange}
                  checked={status === "Finalizado"}
                />
                <span>Finalizado</span>
              </label>
            </div>
            <label>
              Complemento
              <textarea
                placeholder="Descreva seu problema (opcional) "
                value={complement}
                onChange={e => setComplement(e.target.value)}
              />
            </label>
            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
