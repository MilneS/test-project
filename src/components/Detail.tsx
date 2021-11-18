import classes from "./Detail.module.css";
import { useSelector } from "react-redux";
import { AppState } from "../models/interfaces";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

const Detail = () => {
  const restaurant = useSelector((state: AppState) => state.selectedRestaurant);
  const restaurantsList = useSelector((state: AppState) => state.restaurantsList);
  const animate = useSelector((state: AppState) => state.animate);

  const mapAPI: string = process.env.REACT_APP_MAP_API!;
  mapboxgl.accessToken = mapAPI;
  const mapContainer = useRef(null);
  let lng: number;
  let lat: number;
  const zoom: number = 16;

  const locationHandler = () => {
    if (restaurant) {
      lng = restaurant.location.lng;
      lat = restaurant.location.lat;
    }
  };

  const createMap = () => {
    const map = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    return map;
  };

  const createMarker = (
    lngLat: [number, number],
    color: string,
    scale: number,
    target: string,
    map: mapboxgl.Map
  ) => {
    const mapMarker = new mapboxgl.Marker({
      color: color,
      scale: scale,
    })
      .setLngLat(lngLat)
      .setPopup(
        new mapboxgl.Popup({
          className: classes.popup,
          offset: 25,
          closeButton: false,
          maxWidth: "fit-content",
        }).setHTML(`<div>${target}</div>`)
      )
      .addTo(map);
    return mapMarker;
  };

  useEffect(() => {
    locationHandler();
    if (restaurant && restaurantsList) {
      const map = createMap();

      restaurantsList.map((item) => {
        createMarker(
          [item.location.lng, item.location.lat],
          "#43E895",
          0.8,
          item.name,
          map
        );
        return item;
      });

      const marker = createMarker(
        [lng, lat],
        "#34B379",
        1,
        restaurant.name,
        map
      );
      marker.togglePopup();
    }
  }, [restaurant]);

  return (
    <>
      {restaurant && (
        <div className={animate ? classes.animate : classes.mainContainer}>
          <div ref={mapContainer} className={classes.mapContainer} />
          <div className={classes.restaurant}>
            <p className={classes.name}>{restaurant.name}</p>
            <p className={classes.category}>{restaurant.category}</p>
          </div>
          <div className={classes.details}>
            <div className={classes.address}>
              <p>{restaurant.location.address}</p>
              <p>
                {restaurant.location.city}, {restaurant.location.state}{" "}
                {restaurant.location.postalCode}
              </p>
            </div>

            <div className={classes.contact}>
              {restaurant.contact && restaurant.contact.formattedPhone && (
                <p>{restaurant.contact.formattedPhone}</p>
              )}
              {restaurant.contact && restaurant.contact.twitter && (
                <p>@{restaurant.contact.twitter}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
