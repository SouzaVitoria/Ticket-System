import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import Logo from "../../assets/logo.png";

const SignUp = () => {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    signUp(name, email, password);
  };

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={Logo} alt="Logo do Sistema" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Cadastrar</h1>
          <input
            type="text"
            placeholder="Seu Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
        <Link to="/">Já tem uma conta? Entre</Link>
      </div>
    </div>
  );
};

export default SignUp;
