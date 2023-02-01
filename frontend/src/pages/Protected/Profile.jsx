import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../contexts/useAuth";
import Spinner from "../../components/Spinner";
import "../../assets/css/container/Login.scss";

function ProfilUser() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const getUserData = async () => {
      const getUser = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`
      );
      setData(getUser);
      setIsLoaded(true);
    };
    getUserData(); // lance la fonction getUserData
  }, [isLoaded]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      email: event.target.email.value,
      password: event.target.password.value,
      admin: user.admin,
    };

    const updateUserData = async () => {
      const updateUser = await api.apiputmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`,
        body
      );
      if (updateUser.status === 204) {
        setIsSubmit(true);
        setIsLoaded(false);
      }
    };
    updateUserData();
    setShowInput(!showInput);
  };

  return isLoaded ? (
    <>
      {isSubmit && (
        <div id="popup-modal" tabIndex="-1" className="modal">
          <div className="w-full max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow">
              <div className="p-6 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Mise à jour réussi !
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => {
                    navigate("/user/game", { replace: true });
                  }}
                >
                  Retour au Jeu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="login-box">
        <h2>Profile</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              name="firstname"
              type="firstname"
              id="firstname"
              disabled={!showInput ?? "disabled"}
              defaultValue={data.firstname}
              required
            />
            <label htmlFor="firstname">{data.firstname}</label>
          </div>
          <div className="user-box">
            <input
              name="lastname"
              type="lastname"
              id="lastname"
              disabled={!showInput ?? "disabled"}
              defaultValue={data.lastname}
              required
            />
            <label htmlFor="lastname">{data.lastname}</label>
          </div>
          <div className="user-box">
            <input
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              id="email"
              name="email"
              type="email"
              disabled={!showInput ?? "disabled"}
              defaultValue={data.email}
              required
            />
            <label htmlFor="email">{data.email}</label>
          </div>
          <div className="user-box">
            <input
              pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              id="password"
              name="password"
              label="Password"
              type="password"
              disabled={!showInput ?? "disabled"}
              required
            />
            <label htmlFor="password">
              {showInput
                ? "Password"
                : "Mon mot de passe est un petit secret :)"}
            </label>
            {showInput && (
              <span className="form__error">
                Minimum 8 caracteres, une majuscule, une minuscule, un chiffre,
                un caractère spécial.
              </span>
            )}
          </div>

          <div className="flex flex-row justify-center">
            <button type="button" onClick={() => setShowInput(!showInput)}>
              <span />
              <span />
              <span />
              <span /> {showInput ? "Revenir à mon profil" : "Modifier"}
            </button>
            {showInput && (
              <button type="submit">
                <span />
                <span />
                <span />
                <span />
                Valider
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  ) : (
    <Spinner />
  );
  //   </div >
  // </div >
  // );
}
export default ProfilUser;
