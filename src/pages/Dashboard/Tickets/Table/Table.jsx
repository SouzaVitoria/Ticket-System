import { FiSearch, FiEdit2 } from "react-icons/fi";
import "./styles.css"

export default function Table() {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Cliente</th>
          <th scope="col">Assunto</th>
          <th scope="col">Status</th>
          <th scope="col">Cadastro em</th>
          <th scope="col">#</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Cliente">Escola</td>
          <td data-label="Assunto">Suporte</td>
          <td data-label="Status">
            <span className="badge" style={{ backgroundColor: "#5cb85c" }}>
              Em aberto
            </span>
          </td>
          <td data-label="Cadastrado">16/04/2022</td>
          <td data-label="#">
            <button style={{ backgroundColor: "#3583f6" }}>
              <FiSearch size={17} color="#FFF" />
            </button>
            <button style={{ backgroundColor: "#f6a935" }}>
              <FiEdit2 size={17} color="#FFF" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
