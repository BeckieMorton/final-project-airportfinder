import { Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { ResultsIata } from "../pages/ResultsIata/ResultsIata";
import { ResultsCountry } from "../pages/ResultsCountry/ResultsCountry";
import { ResultsCity } from "../pages/ResultsCity/ResultsCity";

const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/airports/iata/:code" element={<ResultsIata />} />
    <Route
      path="/airports/country/:newCountryCode"
      element={<ResultsCountry />}
    />
    <Route path="/airports/area/:municipality" element={<ResultsCity />} />
    <Route path="/airports/name/:name" element={<ResultsName />} />
  </>
);

export default routes;
