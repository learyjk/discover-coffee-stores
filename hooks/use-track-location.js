import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../pages/_app";

const useTrackLocation = () => {
  const [locationErrorMessage, setLocationErrorMessage] = useState("");
  const { dispatch } = useContext(StoreContext);

  // const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
    setLocationErrorMessage("");
    setIsFindingLocation(false);
  };

  const error = () => {
    setLocationErrorMessage("Unable to determine location");
    setIsFindingLocation(false);
  };

  const handleTrackLocation = async () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMessage("Geolocation not supported by browser");
      setIsFindingLocation(false);
    } else {
      // status.textcontent = "Location...";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    //latLong,
    handleTrackLocation,
    locationErrorMessage,
    isFindingLocation,
  };
};

export default useTrackLocation;
