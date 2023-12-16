import { create } from "zustand";

//store for airport data
const useAirportStore = create((set) => ({
  airport: [],
  setAirport: (newAirport) => set({ airport: newAirport }),
}));

export default useAirportStore;
