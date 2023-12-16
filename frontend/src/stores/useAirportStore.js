import { create } from "zustand";

//store for airport data
const useAirportStore = create((set) => ({
  airport: null,
  //changed the above from airport: [], to see if having it as null makes a difference
  setAirport: (newAirport) => set({ airport: newAirport }),
}));

export default useAirportStore;
