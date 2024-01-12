import { MainSearch } from "../../components/MainSearch/MainSearch";
import { HomeHeader } from "../../components/HomeHeader/HomeHeader";
import { Footer } from "../../components/Footer/Footer";

export const Home = () => {
  return (
    <>
      <HomeHeader />
      <MainSearch />
      <Footer camefrom="home" />
    </>
  );
};
