import { React, useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../contexts/useAuth";
import "../../assets/css/container/Login.scss";

export default function LoginPage() {
  const { login } = useAuth();
  const [errorConnect, setErrotConnect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputemail = e.target.email;
    const regex1 = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const inputpassword = e.target.password;
    const regex2 =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (regex1.test(inputemail.value)) {
      if (regex2.test(inputpassword.value)) {
        const email = inputemail.value;
        const password = inputpassword.value;
        const body = { email, password };
        const sendForm = async () => {
          const reslogin = await api.apipostmysql(
            `${import.meta.env.VITE_BACKEND_URL}/login`,
            body
          );
          if (reslogin.status === 200) {
            const jsonadmin = await reslogin.json();
            login({
              admin: jsonadmin.admin,
              email,
              id: jsonadmin.id,
            });
          } else {
            setErrotConnect(true);
          }
        };
        sendForm();
      }
    }
  };

  useEffect(() => {}, [setErrotConnect]);

  return errorConnect ? (
    <section className="modal">
      <span className="overlay" />
      <div className="modal-box">
        <i className="fa-regular fa-circle-check" />
        <h3>Erreur !</h3>
        <p>Il faut réfléchir pour jouer à KATA-SR</p>
        <div className="buttons">
          <button
            data-modal-hide="popup-modal"
            type="button"
            onClick={() => {
              setErrotConnect(false);
            }}
          >
            Essai encore !
          </button>
        </div>
      </div>
    </section>
  ) : (
    <div className="login-box">
      <h2>Login</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            id="email"
            name="email"
            type="email"
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="user-box">
          <input
            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
            id="password"
            name="password"
            label="Password"
            type="password"
            required
          />
          <label htmlFor="password">Password</label>
          <span className="form__error">
            Minimum 8 caracteres, une majuscule, une minuscule, un chiffre, un
            caractère spécial.
          </span>
        </div>
        <button type="submit">
          <span />
          <span />
          <span />
          <span />
          Se Connecter
        </button>
      </form>
    </div>
  );
}
