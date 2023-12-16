import { create } from "zustand";

//store to check if airport data is loaded before laoding the map etc
const useStillLoadingStore = create((set) => ({
  stillLoading: true,
  setStillLoading: (newstillLoading) => set({ stillLoading: newstillLoading }),
}));

export default useStillLoadingStore;
