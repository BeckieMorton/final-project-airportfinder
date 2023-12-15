import { Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Results } from "../pages/Results/Results";

const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/airports/iata/:code" element={<Results />} />
  </>
);

export default routes;
