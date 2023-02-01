import PropTypes from "prop-types";

function BasicPage({ title }) {
  return (
    <div className="wrapper">
      <h1>{title}</h1>
      <p>
        Kata-Speed Run est un petit site créer pour s'amuser à faire des kata
        les plus rapidement possible.
      </p>
    </div>
  );
}
export default BasicPage;

BasicPage.propTypes = {
  title: PropTypes.string.isRequired,
};
