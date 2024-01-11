import { MainSearch } from "../../components/MainSearch/MainSearch";
import { HomeHeader } from "../../components/HomeHeader/HomeHeader";
import { Footer } from "../../components/Footer/Footer";

export const Home = () => {
  const homeFooter = "home";
  const countryFooter = "country";
  const iataFooter = "iata";
  const nameFooter = "name";

  return (
    <>
      <HomeHeader />
      <MainSearch />
      <Footer camefrom={homeFooter} />
    </>
  );
};
