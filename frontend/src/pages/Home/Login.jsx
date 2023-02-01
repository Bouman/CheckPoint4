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
    <div id="popup-modal" tabIndex="-1" className="modal">
      <div className="w-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500">Erreur</h3>
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
      </div>
    </div>
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
