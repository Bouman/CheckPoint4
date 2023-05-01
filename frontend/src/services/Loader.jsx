import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";

function Loader({ foldername, filename }) {
  let DynamicComponent;
  if(import.meta.env.VITE_ENV === "dev") {
    DynamicComponent = lazy(() =>
      import(`./../${foldername}/${filename}.jsx`)
    );
  } else {
    DynamicComponent = lazy(() =>
      import(`./assets/${filename}.jsx`)
    );
  }

  return (
    <Suspense fallback={<Spinner />}>
      <DynamicComponent />
    </Suspense>
  );
}
export default Loader;

Loader.propTypes = {
  foldername: PropTypes.string,
  filename: PropTypes.string,
};
Loader.defaultProps = {
  foldername: "",
  filename: "",
};
