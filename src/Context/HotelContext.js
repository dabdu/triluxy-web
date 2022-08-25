import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
const HotelContext = createContext({});

const HotelContextProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    axios
      .get(`/hotel/allhotels`)
      .then((res) => {
        setHotels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setHotels([]);
    };
  }, []);
  return (
    <HotelContext.Provider value={{ hotels }}>{children}</HotelContext.Provider>
  );
};

export default HotelContextProvider;

export const useHotelContext = () => useContext(HotelContext);
