import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type MainState = {
  worker: Worker | null;
  mutations: {
    setWorker: (worker: Worker) => void;
  };
};

const store = devtools<MainState>((set) => ({
  worker: null,
  mutations: {
    setWorker: (worker) => set((state) => ({ ...state, worker })),
  },
}));

const useWorkerStore = create<MainState>()(store);

export const useWorker = () => useWorkerStore((state) => state.worker);
export const useWorkerMutations = () =>
  useWorkerStore((state) => state.mutations);
