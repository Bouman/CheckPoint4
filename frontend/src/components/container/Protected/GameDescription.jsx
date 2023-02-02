import PropTypes from "prop-types";
import "prismjs/themes/prism.css";

function GameDescription({ kata, title }) {
  console.log(kata);
  return (
    <div className="description">
      <h1>{title}</h1>
      <div className="game-wrapper">
        <p>{kata.description}</p>
        <p>{kata.result1}</p>
        <h2>Données :</h2>
        <pre>
          <code>const ="</code>
        </pre>
        <pre>
          <code>{kata.data1}</code>
        </pre>
        <pre>
          <code>"</code>
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
