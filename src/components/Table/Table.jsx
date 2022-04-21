import { useContext, useEffect, useState } from "react";
import { FiSearch, FiEdit2 } from "react-icons/fi";
import firebase from "../../services/firebaseConnection";
import "./styles.css";
import { format } from "date-fns";
import { ModalContext } from "../../contexts/Modal";

const listRef = firebase
  .firestore()
  .collection("tickets")
  .orderBy("criadoEm", "desc");

export default function Table() {
  const { togglePostModal } = useContext(ModalContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState();
  const [lastDocs, setLastDocs] = useState();
  const [isEmpty, setIsEmpty] = useState();

  useEffect(() => {
    const loadTicket = async () => {
      await listRef
        .limit(5)
        .get()
        .then(snapshot => {
          updateState(snapshot);
        })
        .catch(error => {
          console.log(error);
        });
      setLoading(false);
    };
    loadTicket();
  }, []);

  const updateState = async snapshot => {
    const isCollectionEmpty = snapshot.size === 0;
    if (!isCollectionEmpty) {
      let list = [];
      snapshot.forEach(doc => {
        console.log(doc.data())
        list.push({
          client: doc.data().cliente,
          subject: doc.data().assunto,
          status: doc.data().status,
          complement: doc.data().complemento,
          created: doc.data().criadoEm,
          createdFormatted: format(doc.data().criadoEm.toDate(), "dd/mm/yyyy"),
        });
      });
      setTickets(tickets => [...tickets, ...list]);

      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastDocs(lastDoc);
    } else {
      setIsEmpty(true);
    }
    setLoadingMore(false);
  };

  const handleMore = async () => {
    setLoadingMore(true);
    await listRef
      .startAfter(lastDocs)
      .limit(5)
      .get()
      .then(snapshot => {
        updateState(snapshot);
      })
      .catch(error => console.log(error));
    setLoadingMore(false);
  };

  const renderContent = () => {
    return tickets.map((item, index) => (
      <tr key={index}>
        <td data-label="Cliente">{item.client}</td>
        <td data-label="Assunto">{item.subject}</td>
        <td data-label="Status">
          <span
            className="badge"
            style={{
              backgroundColor: item.status === "Aberto" ? "#5cb85c" : "#999",
            }}
          >
            {item.status}
          </span>
        </td>
        <td data-label="Cadastrado">{item.createdFormatted}</td>
        <td data-label="#">
          <button style={{ backgroundColor: "#3583f6" }}>
            <FiSearch
              size={17}
              color="#FFF"
              onClick={() => togglePostModal(item)}
            />
          </button>
          <button style={{ backgroundColor: "#f6a935" }}>
            <FiEdit2 size={17} color="#FFF" />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
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
          {loading ? (
            <tr>
              <td>Buscando chamados...</td>
            </tr>
          ) : (
            renderContent()
          )}
        </tbody>
      </table>
      {loadingMore && (
        <h3 style={{ textAlign: "center", marginTop: 15 }}>
          Buscando dados...
        </h3>
      )}
      {!loadingMore && (
        <button className="btn-more" onClick={handleMore} disabled={isEmpty}>
          Ver mais
        </button>
      )}
    </>
  );
}
