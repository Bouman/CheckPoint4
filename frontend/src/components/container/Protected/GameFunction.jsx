import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import api from "../../../services/api";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

// Example style, you can use another
function GameFunction({ kata }) {
  const [code, setCode] = useState(`//ici votre code`);

  function handleSubmit(solution) {
    console.warn(solution);
  }

  return (
    <div className="game-wrapper">
      <h1>{kata.title}</h1>
      <div>
        <fieldset>
          <legend>function &#123;</legend>
          <Editor
            value={code}
            onValueChange={(newcode) => setCode(newcode)}
            highlight={(highlightcode) =>
              highlight(highlightcode, languages.js)
            }
            padding={10}
            maxLength={20}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>&#125;</legend>
        </fieldset>
      </div>

      <button type="button" onClick={handleSubmit(code)}>
        Valider
      </button>
    </div>
  );
}
export default GameFunction;
GameFunction.propTypes = {
  kata: PropTypes.object.isRequired,
};
