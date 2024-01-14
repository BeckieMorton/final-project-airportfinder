import { Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { ResultsIata } from "../pages/ResultsIata/ResultsIata";
import { ResultsCountry } from "../pages/ResultsCountry/ResultsCountry";
import { ResultsCity } from "../pages/ResultsCity/ResultsCity";
import { ResultsName } from "../pages/ResultsName/ResultsName";

const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/airports/iata/:code" element={<ResultsIata />} />
    <Route
      path="/airports/country/:newCountryCode"
      element={<ResultsCountry />}
    />
    <Route path="/airports/area/:code" element={<ResultsCity />} />
    <Route path="/airports/name/:code" element={<ResultsName />} />
  </>
);

export default routes;
