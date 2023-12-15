import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MainSearch } from "../../components/MainSearch/MainSearch";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

export const Home = () => {
  return (
    <>
      <Header />
      <MainSearch />
      <Footer />
    </>
  );
};
