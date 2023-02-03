import { useState, useEffect } from "react";
import PropTypes, { array, arrayOf } from "prop-types";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import api from "../../../services/api";
import { useAuth } from "../../../contexts/useAuth";

// Example style, you can use another
function GameFunction({ idTry, kata, speedrunid, lvl, lvlmax, setLVL }) {
  const { user } = useAuth();
  const [resultat, setResultat] = useState("La tete à Toto");
  const [code, setCode] = useState(`return 0 + 0`);
  const [time, setTime] = useState(0);

  function toHoursAndMinutes(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes}:${seconds}`;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      let startTime = 0;
      let endTime = 0;
      const data = kata.data1;
      // chronometre la function
      startTime = performance.now();
      const result = new Function(`data`, code)(data);
      endTime = performance.now();
      // =============
      setResultat(new Function(`data`, code)(data));
      if (result.toString() === kata.result1) {
        const data = kata.data2;
        // Test numéro 2
        if (new Function(`data`, code)(data) === kata.result2) {
          const body = {
            id_try: idTry,
            id_users: user.id,
            id_speedruns: speedrunid,
            id_katas: kata.id,
            solution: code.toString(),
            brain_time: toHoursAndMinutes(time),
            exec_time: endTime - startTime,
          };
          if (lvl === 0) {
            const putScores = async () => {
              const putscores = await api.apiputmysql(
                `${import.meta.env.VITE_BACKEND_URL}/scores/${idTry}`,
                body
              );
              if (putscores.status === 204) {
                console.warn("Et un niveau de passé ! Bien joué !");
                setTime(0);
                setCode(`return`);
                setLVL(lvl + 1);
              } else {
                console.warn(
                  "PUT : Problèmes lors de l'enregistrement du score, nous sommes désolé"
                );
              }
            };
            putScores();
          } else {
            const postScores = async () => {
              const postscores = await api.apipostmysql(
                `${import.meta.env.VITE_BACKEND_URL}/scores`,
                body
              );
              if (postscores.status === 201) {
                console.warn("Et un niveau de passé ! Bien joué !");
                setTime(0);
                setCode(`return`);
                setLVL(lvl + 1);
              } else {
                console.warn(
                  "POST : Problèmes lors de l'enregistrement du score, nous sommes désolé"
                );
              }
            };
            postScores();
          }
        } else {
          console.warn("Tu n'as pas passé le second test !");
        }
      } else {
        console.warn("Réflechis encore !");
      }
    } catch (error) {
      setResultat(error.toString());
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(time + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div className="game-wrapper">
      <h1>{kata.title}</h1><h2 style={{ float: "right" }} >Lvl: {lvl+1}/{lvlmax}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <fieldset>
            <legend style={{ color: "orange" }}>function(data)&#123;</legend>
            <Editor
              value={code}
              onValueChange={(newcode) =>
                setCode(
                  newcode
                    .replace("fetch", "")
                    .replace("axios", "")
                    .replace("http:", "")
                    .replace("www", "")
                    .replace("iframe", "")
                    // .replace("join", "join()")
                    // .replace("split", "split()")
                    // .replace("reverse", "reverse()")
                    // .replace("toLowerCase", "toLowerCase()")
                )
              }
              highlight={(highlightcode) =>
                highlight(highlightcode, languages.js)
              }
              padding={10}
              maxLength={kata.limit_char > 0 ? kata.limit_char : null}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 18,
                backgroundColor: "whitesmoke",
              }}
            />
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend style={{ color: "orange" }}>
              &#125;
              <small style={{ color: "whitesmoke" }}>
                (Ne pas écrire funtion&#123;&#125;)
              </small>
            </legend>
          </fieldset>
        </div>
        <button style={{ float: "right" }} key="submit" type="submit">
          Valider <br />
          <small style={{ color: "white", fontSize: "" }}>
            {time} secondes
          </small>
        </button>
      </form>
      <div>
        <legend>
          <u>Votre résultat</u> :
        </legend>
        <p>{resultat}</p>
      </div>
    </div>
  );
}
export default GameFunction;
GameFunction.propTypes = {
  idTry: PropTypes.number.isRequired,
  lvl: PropTypes.number.isRequired,
  lvlmax: PropTypes.number.isRequired,
  kata: PropTypes.object.isRequired,
};


