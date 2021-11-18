import { Cc, City, Country, State } from "./enums";

export interface AppState {
  restaurantsList?: Restaurant[];
  showList: boolean;
  showDetail: boolean;
  animate: boolean;
  selectedRestaurant?: Restaurant;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface RestaurantList {
  restaurants: Restaurant[];
}
export interface Restaurant {
  name: string;
  backgroundImageURL: string;
  category: string;
  contact: Contact | null;
  location: Location;
}

export interface Contact {
  phone: string;
  formattedPhone: string;
  twitter?: string;
  facebook?: string;
  facebookUsername?: string;
  facebookName?: string;
}

export interface Location {
  address: string;
  crossStreet?: string;
  lat: number;
  lng: number;
  postalCode?: string;
  cc: Cc;
  city: City;
  state: State;
  country: Country;
  formattedAddress: string[];
}
