import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const [currentcity, setCurrentcity] = useState([]);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoding(true);

        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data);
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoding(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoding(true);

      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      console.log(data);
      setCurrentcity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoding(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentcity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
