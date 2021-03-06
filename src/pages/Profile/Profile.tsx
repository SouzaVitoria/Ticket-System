import React, { useState, useContext } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";

import { AuthContext } from "../../contexts/Auth";
import firebase from "../../services/firebaseConnection";

import "./styles.css";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import avatar from "../../assets/avatar.png";

export default function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl);
  const [currentAvatar, setCurrentAvatar] = useState(null);

  const handleSave = async e => {
    e.preventDefault();
    const uid = user.uid;

    if (!currentAvatar && name) {
      await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .update({
          ...user,
          name,
        })
        .then(() => {
          let data = {
            ...user,
            name,
          };
          setUser(data);
          storageUser(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (currentAvatar && name) {
      handleUpload();
    }
  };

  const handleFile = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setCurrentAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        alert("png ou jpeg");
        setCurrentAvatar(null);
        return;
      }
    }
  };

  const handleUpload = async () => {
    const currentUid = user.uid;
    const uploadTask = await firebase
      .storage()
      .ref(`images/${user.email}-${currentUid}/${currentAvatar.name}`)
      .put(currentAvatar)
      .then(async () => {
        await firebase
          .storage()
          .ref(`images/${user.email}-${currentUid}`)
          .child(currentAvatar.name)
          .getDownloadURL()
          .then(async url => {
            await firebase
              .firestore()
              .collection("users")
              .doc(currentUid)
              .update({
                name: name,
                avatarUrl: url,
              })
              .then(() => {
                let data = {
                  ...user,
                  avatarUrl: url,
                  name: name,
                };
                setUser(data);
                storageUser(data);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => console.log(error))
          .update();
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Meu Perfil">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSave}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />{" "}
              <br />
              {!avatarUrl ? (
                <img
                  src={avatar}
                  alt="Foto do perfil do usu??rio"
                  width="250"
                  height="250"
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto do perfil do usu??rio"
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
