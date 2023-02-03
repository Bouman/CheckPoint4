import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../services/api";
import { useAuth } from "../../../contexts/useAuth";

// Example style, you can use another
function ScoresGeneral({ title }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [srSelected, setSrSelected] = useState(null);
  const [AllSR, setAllSR] = useState([]);
  const [AllScores, setAllScores] = useState(null);
  const { user } = useAuth();

  const HandlerSR = (event) => {
    event.preventDefault();
    setSrSelected(event.target.value !== "" ? event.target.value : null);
  };

  useEffect(() => {
    const getScoresData = async () => {
      if (srSelected != null) {
        // get the ALL scores by id speedrun
        const getScores = await api.apigetmysql(
          `${import.meta.env.VITE_BACKEND_URL}/scores/${srSelected}`
        );
        setAllScores(getScores);
      }
      if (!AllSR.lenght) {
        // get the ALL SR
        const callsr = await api.apigetmysql(
          `${import.meta.env.VITE_BACKEND_URL}/sr`
        );
        setAllSR(callsr);
        setIsLoaded(true);
      }
    };
    getScoresData(); // lance la fonction getScoresData
  }, [isLoaded, srSelected]);

  return (
    isLoaded && (
      <>
        <h1>{title}</h1>
        <label htmlFor="SR-select">Choisis ton SpeedRun :</label>
        <select
          key="addSRselect"
          id="addSRselect"
          onChange={HandlerSR}
          required
        >
          <option key="select" value="">
            Selectionne un SpeedRun
          </option>
          {AllSR.map((key) => (
            <option key={key.id} id={key.id} value={key.id}>
              {key.title}
            </option>
          ))}
        </select>
        {AllScores && (
          <div className="table-container">
            <div className="table-row heading">
              <div className="row-item">Player</div>
              {AllScores.katas.map((kata) => {
                return <div className="row-item">{kata.title}</div>;
              })}
              <div className="row-item">Total</div>
            </div>
            {AllScores.scores.map((score) => {
              return (
                <div className="table-row">
                  <div className="row-item">{score.id_users}</div>
                  {AllScores.katas.map((kata) => {
                    return (
                      <div className="row-sub-container">
                        <div className="row-item">
                          Réf:{" "}
                          {score.brain_time.slice(3, score.brain_time.lenght)}s
                        </div>
                        <div className="row-item">
                          Exec:{" "}
                          {score.exec_time.slice(6, score.exec_time.lenght)}s
                        </div>
                      </div>
                    );
                  })}
                  <div className="row-item">
                    {score.brain_time + score.exec_time}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    )
  );
}
export default ScoresGeneral;

ScoresGeneral.propTypes = {
  title: PropTypes.string.isRequired,
};
