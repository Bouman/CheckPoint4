import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
// Example style, you can use another
function GameFunction() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  function handleSubmit(solution) {
    console.warn(solution);
  }

  return (
    <div className="game">
      <Editor
        value={code}
        onValueChange={(newcode) => setCode(newcode)}
        highlight={(highlightcode) => highlight(highlightcode, languages.js)}
        padding={10}
        maxLength={20}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      <button type="button" onClick={handleSubmit(code)}>
        Valider
      </button>
    </div>
  );
}

export default GameFunction;
