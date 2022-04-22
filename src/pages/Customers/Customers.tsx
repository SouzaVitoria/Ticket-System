import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import firebase from "../../services/firebaseConnection";

export default function Customers() {
  const [fancyName, setFancyName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [address, setAddress] = useState("");

  const handleAdd = async e => {
    e.preventDefault();

    if (fancyName && cnpj && address) {
      await firebase.firestore().collection("customers")
      .add({
        nomeFantasia: fancyName,
        cnpj,
        endereco: address
      }).then(()=> {
        setFancyName("");
        setCnpj("");
        setAddress("");
      }).catch(error => console.log(error));
    } else {
      console.log("Preencha todos os campos")
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Clientes">
          <FiUser size={25} />
        </Title>
        <div className="container">
          <form className="form-profile customers" onSubmit={handleAdd}>
            <label>
              Nome Fantasia <br />
              <input
                type="text"
                placeholder="Nome da sua empresa"
                value={fancyName}
                onChange={e => setFancyName(e.target.value)}
                required
              />
            </label>
            <label>
              CNPJ <br />
              <input
                type="text"
                placeholder="CNPJ da empresa"
                value={cnpj}
                onChange={e => setCnpj(e.target.value)}
                required
              />
            </label>
            <label>
              Endereço <br />
              <input
                type="text"
                placeholder="Endereço da empresa"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />
            </label>
            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
