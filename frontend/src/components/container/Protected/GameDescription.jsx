import PropTypes from "prop-types";

function GameDescription({ title }) {
  return (
    <div className="description">
      <h1>{title}</h1>
      <p>Ici la description</p>
    </div>
  );
}
export default GameDescription;

GameDescription.propTypes = {
  title: PropTypes.string.isRequired,
};
