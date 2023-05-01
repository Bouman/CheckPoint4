import "./assets/css/App.css";
import { useRoutes, useLocation } from "react-router-dom";
import { Suspense, useContext } from "react";
import Loader from "@services/Loader";
import { FolderContext } from "./contexts/Folder";
import ErrorPage from "./pages/Error";
import Spinner from "./components/Spinner";

function App() {
  const { pages } = useContext(FolderContext);

  // // Array pour les routes du dossier pages
  let routes = [];
  Object.values(pages).forEach((element, index) => {
    let childrenroutes = [];
    const folder = Object.keys(pages)[index];
    Object.keys(element).forEach((files) => {
      childrenroutes = [
        ...childrenroutes,
        {
          path: `${files.toLocaleLowerCase().replace("home", "/")}`,
          element: (
            <Suspense fallback={<Spinner />}>
              <Loader foldername={`${import.meta.env.VITE_PUBLIC_PAGES_URL ?? ""}${folder}/`} filename={files} />
            </Suspense>
          ),
          errorElement: <ErrorPage />,
        },
      ];
    });

    routes = [
      ...routes,
      {
        path: `/${folder
          .toLocaleLowerCase()
          .replace("home", "")
          .replace("protected", "user")}`,
        element: (
          <Suspense fallback={<Spinner />}>
            <Loader foldername={`${import.meta.env.VITE_PUBLIC_COMPONENTS_URL ?? ""}/`} filename={`${folder}Layout`} />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: childrenroutes,
      },
    ];
  });

  /// On rajoute les components dans les sous-routes
  const element = useRoutes(routes);
  const URL = useLocation().pathname + useLocation().search;
  localStorage.setItem("location", URL);

  return element;
}
export default App;
