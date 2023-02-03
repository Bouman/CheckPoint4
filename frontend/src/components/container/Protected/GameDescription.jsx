import PropTypes from "prop-types";
import "prismjs/themes/prism.css";

function GameDescription({ kata, title }) {
  return (
    <div className="description">
      <h1>{title}</h1>
      <div className="game-wrapper">
        <p style={{ color: "grey" }}>{kata.description}</p>
        <h2>Règles :</h2>
        <p style={{ color: "grey" }}>{kata.rules}</p>
        <p style={{ color: "grey" }}>{kata.result1}</p>
        <h2>Données :</h2>
        <pre>
          <code style={{ color: "orange" }}>const data =</code>
        </pre>
        <pre>
          <code style={{ color: "grey" }}>{kata.data1 ?? "NULL"}</code>
        </pre>
      </div>
    </div>
  );
}
export default GameDescription;

GameDescription.propTypes = {
  kata: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
