import GameDescription from "../../components/container/Protected/GameDescription";
import GameFunction from "../../components/container/Protected/GameFunction";
import "../../assets/css/container/Game.scss";

function Scores() {
  return (
    <>
      <div className="description">
        <GameDescription title="Description" />
      </div>
      <div className="game">
        <GameFunction />
      </div>
    </>
  );
}
export default Scores;
