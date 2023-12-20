import { create } from "zustand";

//store for country data
const useCountryStore = create((set) => ({
  country: null,
  //changed the above from airport: [], to see if having it as null makes a difference
  setCountry: (newCountry) => set({ country: newCountry }),
}));

export default useCountryStore;
