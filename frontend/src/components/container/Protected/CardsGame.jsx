import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../../assets/css/container/CardsGames.scss";
import api from "../../../services/api";

function CardsGames({ title }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [games, setGames] = useState({});

  //   const cell = document.querySelectorAll(".card");
  //   cell.forEach((c) => {
  //     const expander = c.querySelector(".js-expander");
  //     const collapser = c.querySelector(".js-collapser");

  //     const expanderListener = expander.addEventListener("click", function () {
  //       const thisCell = this.closest(".card");

  //       if (thisCell.classList.contains("is-collapsed")) {
  //         cell.forEach((cc) => {
  //           if (cc !== thisCell) {
  //             cc.classList.remove("is-expanded");
  //             cc.classList.add("is-collapsed");
  //             cc.classList.add("is-inactive");
  //           }
  //         });
  //         thisCell.classList.remove("is-collapsed");
  //         thisCell.classList.add("is-expanded");

  //         cell.forEach((cc) => {
  //           if (cc !== thisCell && !cc.classList.contains("is-inactive")) {
  //             cc.classList.add("is-inactive");
  //           }
  //         });
  //       } else {
  //         thisCell.classList.remove("is-expanded");
  //         thisCell.classList.add("is-collapsed");
  //         cell.forEach((cc) => {
  //           cc.classList.remove("is-inactive");
  //         });
  //       }
  //     });
  //     const collapserListener = collapser.addEventListener("click", function () {
  //       const thisCell = this.closest(".card");
  //       thisCell.classList.remove("is-expanded");
  //       thisCell.classList.add("is-collapsed");
  //       cell.forEach((cc) => {
  //         cc.classList.remove("is-inactive");
  //       });
  //     });
  //   });

  useEffect(() => {
    const getAllApis = async () => {
      // get the decision
      const callApi = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/speedrun/api`
      );
      setGames(callApi);
      setIsLoaded(true);
    };
    getAllApis();
  }, [isLoaded]);

  return (
    isLoaded && (
      <div className="cards-wrapper">
        <div className="header">
          <h1 className="header__title">{title}</h1>
          <h2 className="header__subtitle">Api Source Speedrun.com</h2>
        </div>
        <div className="cards">
          {games.map((item) => {
            return (
              <div className=" card [ is-collapsed ] ">
                <div
                  style={{
                    backgroundImage: `url(${item.assets["cover-medium"].uri}`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  className="card__inner [ js-expander ]"
                  onClick={() => navigate(item.links[1].uri)}
                >
                  <span>{item.names.international}</span>
                  <i className="fa fa-folder-o" />
                </div>
                {/* <div className="card__expander">
                    <i className="fa fa-close [ js-collapser ]" />
                    Expander
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
export default CardsGames;

CardsGames.propTypes = {
  title: PropTypes.string.isRequired,
};
