import { createStore } from "redux";
import { AppState, Action } from "../models/interfaces";

const initialAppState: AppState = {
  restaurantsList: [],
  showList: true,
  showDetail: false,
  animate: false,
};
const reducerFunc = (state: AppState = initialAppState, action: Action) => {
  switch (action.type) {
    case "setRestaurantsList":
      return { ...state, restaurantsList: action.payload };

    case "setSelectedRestaurant":
      return { ...state, selectedRestaurant: action.payload };

    case "setShowDetail":
      return { ...state, showDetail: true, showList: false };
    case "hideDetail":
      return { ...state, showDetail: false, animate: false };

    case "setAnimate":
      return { ...state, animate: true, showList: true };
  }

  return state;
};

const store = createStore(reducerFunc);

export default store;
