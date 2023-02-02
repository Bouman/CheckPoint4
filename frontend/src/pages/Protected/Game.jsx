import { useState, useEffect } from "react";
import api from "../../services/api";
import GameDescription from "../../components/container/Protected/GameDescription";
import GameFunction from "../../components/container/Protected/GameFunction";
import "../../assets/css/container/Game.scss";

function Scores() {
  const [isLoaded, setisLoaded] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [srSelected, setSrSelected] = useState("");
  const [katas, setKatas] = useState([]);
  const [AllSR, setAllSR] = useState([]);
  const [lvl, setLVL] = useState(0);

  const HandlerSR = (event) => {
    event.preventDefault();
    setSrSelected(event.target.value !== "" ? event.target.value : null);
  };

  const handleSubmit = () => {
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
      console.log(srSelected);
      if (srSelected != "") {
        // get the ALL kata by id speedrun
        const callkatas = await api.apigetmysql(
          `${import.meta.env.VITE_BACKEND_URL}/katas/${srSelected}`
        );
        setKatas(callkatas);
        setLVL(0);
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
              <i className="fa-regular fa-circle-check" />
              <h3>Prêt pour le Run ?</h3>
              <p>Règles :</p>
              <p>
                Les katas sont chronométré, entre chaques niveau le chronomètre
                est mis en pause.
              </p>
              <div>
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
                  {katas.length && (
                    <div className="button">
                      <button key="submit" type="submit">
                        Start !
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </section>
        )}
        {katas.length && !showModal && (
          <>
            <div className="description">
              <GameDescription kata={katas[lvl]} title="Description" />
            </div>
            <div className="game">
              <GameFunction kata={katas[lvl]} speedrunid={srSelected} />
            </div>
          </>
        )}
      </>
    )
  );
}
export default Scores;
