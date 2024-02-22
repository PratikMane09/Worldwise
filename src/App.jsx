import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Homepage from "./Pages/Homepage";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";
import City from "./components/City";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import Form from "./components/Form";

import CountryList from "./components/CountryList";

const BASE_URL = "http://localhost:9000/cities";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoding] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoding(true);

        const res = await fetch(`${BASE_URL}`);

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

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />

            {/* when taking back it get replace in url without replace can not move back in page
             */}
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
