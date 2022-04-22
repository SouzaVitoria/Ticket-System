import React from "react";
import { FiX } from "react-icons/fi";
import "./styles.css";

export default function Modal({ content, close }) {
  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX size={18} color="#000" />
        </button>
        <div className="content">
          <h2>Detalhes do chamado</h2>
          <div className="row">
            <div className="column">
              <strong>Cadastrado em:</strong> <i>{content.createdFormatted}</i>
            </div>
            <div className="column">
              <strong>Status:</strong>
              <i
                className="status"
                style={{
                  color: "#FFF",
                  backgroundColor:
                    content.status === "Aberto" ? "#5cb85c" : "#999",
                }}
              >
                {content.status}
              </i>
            </div>
          </div>
          <div className="row">
            <strong>Cliente:</strong> <i>{content.client}</i>
          </div>
          <div className="row">
            <strong>Assunto:</strong> <i>{content.subject}</i>
          </div>
          {content.complement && (
            <div className="row row-complement">
              <strong>Complemento:</strong>
              <p>{content.complement}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
