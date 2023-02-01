import PropTypes from "prop-types";

function BasicPage({ title }) {
  return (
    <>
      <h1>{title}</h1>
      <hr />
      <p>
        Kata-Speed Run est un petit site créer pour s'amuser à faire des kata
        les plus rapidement possible.
      </p>
    </>
  );
}
export default BasicPage;

BasicPage.propTypes = {
  title: PropTypes.string.isRequired,
};
