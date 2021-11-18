import classes from "./List.module.css";
import listGradient from "../assets/ListGradient.png";
import { useEffect } from "react";
import { Restaurant, RestaurantList, AppState } from "../models/interfaces";
import { useSelector, useDispatch } from "react-redux";

const List = () => {
  const dispatch = useDispatch();
  const restaurantsList = useSelector((state: AppState) => state.restaurantsList);

  const getRestaurantsData = async () => {
    const restaurantsAPI: string = process.env.REACT_APP_RESTAURANT_API!;
    const response: Response = await fetch(restaurantsAPI, {
      method: "GET",
    });
    if (response.ok) {
      const data: RestaurantList = await response.json();
      dispatch({ type: "setRestaurantsList", payload: data.restaurants });
    }
  };

  useEffect(() => {
    getRestaurantsData();
  }, []);

  const selectedRestaurant = (item: Restaurant) => {
    dispatch({ type: "setSelectedRestaurant", payload: item });
    dispatch({ type: "setShowDetail" });
  };

  return (
    <div className={classes.restaurantsContainer}>
      {restaurantsList?.map((item: Restaurant, index: number) => {
        return (
          <div
            key={index}
            className={classes.restaurant}
            onClick={() => selectedRestaurant(item)}
          >
            <img
              src={item.backgroundImageURL}
              alt=""
              className={classes.image}
            />
            <img src={listGradient} alt="" className={classes.gradient} />
            <div className={classes.infoContainer}>
              <div className={classes.info}>
                <p className={classes.name}>{item.name}</p>
                <p className={classes.category}>{item.category}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
