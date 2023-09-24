import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  WeatherAction,
  WeatherData,
  WeatherError,
  GET_WEATHER,
  SET_LOADING,
  SET_ERROR,
} from "../types";

export const getWeather = (
  latitude: number | null,
  longitude: number | null,
  city: string
): ThunkAction<void, RootState, null, WeatherAction> => {
  let url: string;
  // let cityUrl: string;
  console.log(latitude, longitude, city);
  if (latitude && longitude) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=32a5bb7b9aa1126387e06acad817149e`;
  }
  if (latitude && longitude && city !== "") {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=32a5bb7b9aa1126387e06acad817149e`;
  }

  return async (dispatch) => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: WeatherData = await res.json();
      dispatch({
        type: GET_WEATHER,
        payload: resData,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};

export const setLoading = (): WeatherAction => {
  return {
    type: SET_LOADING,
  };
};

export const setError = (): WeatherAction => {
  return {
    type: SET_ERROR,
    payload: "",
  };
};
