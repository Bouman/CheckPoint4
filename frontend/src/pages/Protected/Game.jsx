import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import GameDescription from "../../components/container/Protected/GameDescription";
import GameFunction from "../../components/container/Protected/GameFunction";
import "../../assets/css/container/Game.scss";
import { useAuth } from "../../contexts/useAuth";

function Scores() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoaded, setisLoaded] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [srSelected, setSrSelected] = useState(null);
  const [katas, setKatas] = useState([]);
  const [AllSR, setAllSR] = useState([]);
  const [lvl, setLVL] = useState(0);
  const [lvlmax, setLvlmax] = useState(null);
  const [idTry, setIdTry] = useState(null);

  const HandlerSR = (event) => {
    event.preventDefault();
    setSrSelected(event.target.value !== "" ? event.target.value : null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      id_try: null,
      id_users: user.id,
      id_speedruns: null,
      id_katas: null,
      solution: null,
      brain_time: null,
      exec_time: null,
    };
    const setTry = async () => {
      const startscores = await api
        .apipostmysql(`${import.meta.env.VITE_BACKEND_URL}/scores`, body)
        .then((res) => res.json());
      setIdTry(startscores);
    };
    setTry();
    console.warn("Bonne chance");
    setShowModal(false);
  };

  useEffect(() => {
    const getAllApis = async () => {
      if (!AllSR.lenght) {
        // get the ALL SR
        const callsr = await api.apigetmysql(
          `${import.meta.env.VITE_BACKEND_URL}/sr`
        );
        setAllSR(callsr);
        setisLoaded(true);
      }
      if (srSelected != null) {
        // get the ALL kata by id speedrun
        const callkatas = await api.apigetmysql(
          `${import.meta.env.VITE_BACKEND_URL}/katas/${srSelected}`
        );
        setKatas(callkatas);
        setLvlmax(callkatas.length);
      }
      if (lvlmax === lvl) {
        // get the ALL scores
        const callscores = await api.apigetmysql(
          `${import.meta.env.VITE_BACKEND_URL}/scores/${user.id}/${srSelected}`
        );
      }
    };
    getAllApis();
  }, [srSelected]);

  return (
    isLoaded && (
      <>
        {showModal && (
          <section className="modal">
            <span className="overlay" />
            <div className="modal-box">
              <h3>Pr&ecirc;t pour le Run ?&nbsp;😀&nbsp;</h3>
                <p><em>Règles</em> :</p>
                <ul className="doted">
                  <li className="doted">Les katas sont <strong>chronom&eacute;tr&eacute;</strong></li>
                  <li className="doted">D&egrave;s le Button "<em><strong>Start</strong></em>" pr&eacute;ss&eacute; les katas s'encha&icirc;ne.</li>
                  <li className="doted">Il faut toujours mettre le mot "<em><strong>return</strong></em>" &agrave; ta function.</li>
                  <li className="doted">Il peut y avoir des indices partout (Titre du kata, description, ...)</li>
                </ul>
                <p>&nbsp;</p>
              <div>
              <hr />
                <form onSubmit={handleSubmit}>
                  <label htmlFor="SR-select">Choisis ton SpeedRun :</label>
                  <select
                    key="addSRselect"
                    id="addSRselect"
                    onChange={HandlerSR}
                    required
                  >
                    <option key="select" value="">
                      Selectionne ton SpeedRun
                    </option>
                    {AllSR.map((key) => (
                      <option key={key.id} id={key.id} value={key.id}>
                        {key.title}
                      </option>
                    ))}
                  </select>
                  {katas.length ? (
                    <p>
                      <button
                        style={{ float: "right" }}
                        key="submit"
                        type="submit"
                      >
                        Start !
                      </button>
                    </p>
                  ) : (
                    <div>
                      <hr />
                      <p>
                        <button
                          type="button"
                          onClick={() => navigate("/user/scores")}
                        >
                          Retour en lieu sûr !
                        </button>
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </section>
        )}
        {idTry &&
          katas.length &&
          !showModal &&
          (lvlmax === lvl && !showModal ? (
            <section className="modal">
              <span className="overlay" />
              <div className="modal-box">
                <i className="fa-regular fa-circle-check" />
                <h3>Félicitation.</h3>
                <p>Vous avez fini le Speed run !</p>
                <p>Votre temps :</p>
                <p>
                  <button
                    type="button"
                    onClick={() => navigate("/user/scores")}
                  >
                    Allez voir les scores !
                  </button>
                </p>
              </div>
            </section>
          ) : (
            <>
              <div className="description">
                <GameDescription kata={katas[lvl]} title="Description" />
              </div>
              <div className="game">
                <GameFunction
                  idTry={idTry}
                  kata={katas[lvl]}
                  speedrunid={srSelected}
                  lvl={lvl}
                  lvlmax={lvlmax}
                  setLVL={setLVL}
                />
              </div>
            </>
          ))}
      </>
    )
  );
}
export default Scores;
