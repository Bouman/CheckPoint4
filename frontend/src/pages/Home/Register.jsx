import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import api from "../../services/api";
import "../../assets/css/container/Login.scss";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorConnect, setErrotConnect] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputEmail = e.target.email;
    const regex1 = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const inputPassword = e.target.password;
    const regex2 =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (regex1.test(inputEmail.value) && regex2.test(inputPassword.value)) {
      const email = inputEmail.value;
      const password = inputPassword.value;
      const firstname = e.target.firstname.value;
      const lastname = e.target.lastname.value;
      const body = {
        firstname,
        lastname,
        email,
        password,
        admin: 0,
      };
      const sendForm = async () => {
        const resRegister = await api.apipostmysql(
          `${import.meta.env.VITE_BACKEND_URL}/register`,
          body
        );

        if (resRegister.status === 201) {
          const body2 = { email, password };
          const reslogin = await api.apipostmysql(
            `${import.meta.env.VITE_BACKEND_URL}/login`,
            body2
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
        }
      };
      sendForm();
    } else if (
      regex1.test(inputEmail.value) === !true ||
      regex2.test(inputPassword.value) === !true
    ) {
      console.warn("Erreur input");
    }
  };

  return errorConnect ? (
    <div id="popup-modal" tabIndex="-1" className="modal">
      <div className="w-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500">Erreur</h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={() => navigate("/login")}
            >
              Lors de la connexion
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="login-box">
      <h2>Inscription</h2>
      <form name="form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="user-box">
          <input name="firstname" type="firstname" id="firstname" required />
          <label htmlFor="firstname">Prénom</label>
        </div>
        <div className="user-box">
          <input required name="lastname" type="lastname" id="lastname" />
          <label htmlFor="lastname">Nom</label>
        </div>
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
          Enregistrer
        </button>
      </form>
    </div>
  );
}
export default LoginPage;
