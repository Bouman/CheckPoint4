import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";

function Loader({ foldername, filename }) {

    const DynamicComponent = lazy(() =>
      import(`./../${foldername}/${filename}.jsx`)
    );
    const ProdDynamicComponent = lazy(() =>
      import(`./imports/${filename}.js`)
    );

  return (
    <Suspense fallback={<Spinner />}>
      {import.meta.env.VITE_ENV === "dev" ?
        <DynamicComponent />
        :
        <ProdDynamicComponent />
      }
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
