import { create } from "zustand";

type MainState = {
  worker: Worker | null;
  mutations: {
    setWorker: (worker: Worker) => void;
  };
};

const useMainStore = create<MainState>()((set) => ({
  worker: null,
  mutations: {
    setWorker: (worker) => set((state) => ({ ...state, worker })),
  },
}));

export const useWorker = () => useMainStore((state) => state.worker);
export const useMutations = () => useMainStore((state) => state.mutations);
