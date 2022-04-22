import React, { useState, useEffect, useContext } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/Auth";
import firebase from "../../../../services/firebaseConnection";
import Header from "../../../../components/Header/Header";
import Title from "../../../../components/Title/Title";
import "./styles.css";

export default function NewTicket() {
  const { id } = useParams();
  const { history } = useHistory();
  const { user } = useContext(AuthContext);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);
  const [subject, setSubject] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [complement, setComplement] = useState("");
  const [idCustomer, setIdCustomer] = useState(false);

  useEffect(() => {
    async function loadCustomers() {
      await firebase
        .firestore()
        .collection("customers")
        .get()
        .then(snapshot => {
          let list = [];
          snapshot.forEach(doc => {
            list.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });

          if (list.length === 0) {
            console.log("Nenhuma empresa encontrada");
            setCustomers([{ id: "1", nomeFantasia: "" }]);
            setLoadingCustomers(false);
            return;
          }

          setCustomers(list);
          setLoadingCustomers(false);

          if (id) {
            loadId(list);
          }
        })
        .catch(error => {
          console.log(error);
          setLoadingCustomers(false);
          setCustomers([{ id: "1", nomeFantasia: "" }]);
        });
    }

    const loadId = async list => {
      await firebase
        .firestore()
        .collection("tickets")
        .doc(id)
        .get()
        .then(snapshot => {
          setSubject(snapshot.data().assunto);
          setStatus(snapshot.data().status);
          setComplement(snapshot.data().complemento);

          let index = list.findIndex(
            item => item.id === snapshot.data().clienteId
          );
          setCustomerSelected(index);
          setIdCustomer(true);
        })
        .catch(error => {
          console.log(error);
          setIdCustomer(false);
        });
    };

    loadCustomers();
  }, [id]);

  const handleRegister = async e => {
    e.preventDefault();

    if (idCustomer) {
      await firebase
        .firestore()
        .collection("tickets")
        .doc(id)
        .update({
          cliente: customers[customerSelected].nomeFantasia,
          clienteId: customers[customerSelected].id,
          assunto: subject,
          status,
          complemento: complement,
          usuarioId: user.uid,
        })
        .then(() => {
          toast.success("Chamado editado com sucesso");
          setComplement("");
          setCustomerSelected("");
          history.push("/dashboard")
        })
        .catch(error => console.log(error));
        return
    }

    await firebase
      .firestore()
      .collection("tickets")
      .add({
        criadoEm: new Date(),
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: subject,
        status,
        complemento: complement,
        usuarioId: user.uid,
      })
      .then(() => {
        toast.success("Chamado criado com sucesso!");
        setComplement("");
        setCustomerSelected("");
      })
      .catch(error => console.log(error));
  };

  const handleChangeSelect = e => {
    setSubject(e.target.value);
  };

  const handleOptionChange = e => {
    setStatus(e.target.value);
  };

  const handleChangeCustomers = e => {
    setCustomerSelected(e.target.value);
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
              {loadingCustomers ? (
                <input type="text" value="Carregando clientes..." disabled />
              ) : (
                <select
                  value={customerSelected}
                  onChange={handleChangeCustomers}
                >
                  {customers.map((item, index) => {
                    return (
                      <option key={item.id} value={index}>
                        {item.nomeFantasia}
                      </option>
                    );
                  })}
                </select>
              )}
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
