import classes from "./App.module.css";
import List from "./components/List";
import Detail from "./components/Detail";
import mapIcon from "./assets/mapIcon.png";
import backArrow from "./assets/backArrow.png";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "./models/interfaces";

function App() {
  const dispatch = useDispatch();
  const showDetail = useSelector((state: AppState) => state.showDetail);
  const showList = useSelector((state: AppState) => state.showList);
  const animate = useSelector((state: AppState) => state.animate);

  const backHandler = (e: React.MouseEvent) => {
    dispatch({ type: "setAnimate" });
    setTimeout(() => {
      dispatch({ type: "hideDetail" });
    }, 500);
  };

  return (
    <div className={classes.app}>
      <div className={classes.banner}>
        <p>Lunch Tyme</p>
        {showDetail && (
          <img
            src={backArrow}
            alt=""
            className={classes.backArrow}
            onClick={backHandler}
          />
        )}
        <img src={mapIcon} alt="" className={classes.mapIcon} />
      </div>
      <div className={animate ? classes.animate : ""}>
        {showList && <List />}
      </div>
      {showDetail && <Detail />}
    </div>
  );
}

export default App;
