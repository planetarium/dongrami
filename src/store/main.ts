import { Account } from '@planetarium/sign';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { WorkerResultMessage } from '../types/message';

type MainState = {
  worker: Worker | null;
  message: WorkerResultMessage | null;
  keystore: string | null;
  publicKey: string | null;
  account: Account | null;
  mutations: {
    setWorker: (worker: Worker) => void;
    setMessage: (message: WorkerResultMessage) => void;
    setKeystore: (keystore: string) => void;
    setAccount: (account: Account) => void;
  };
};

const useMainStore = create<MainState>()(
  devtools((set) => ({
    worker: null,
    message: null,
    keystore: null,
    account: null,
    publicKey: null,
    mutations: {
      setWorker: (worker) => set((state) => ({ ...state, worker })),
      setMessage: (message) => set((state) => ({ ...state, message })),
      setKeystore: (keystore) => set((state) => ({ ...state, keystore })),
      setAccount: (account) => set((state) => ({ ...state, account })),
    },
  }))
);

export const useWorker = () => useMainStore((state) => state.worker);
export const useMessage = () => useMainStore((state) => state.message);
export const useKeystore = () => useMainStore((state) => state.keystore);
export const useAccount = () => useMainStore((state) => state.account);
export const useAccountState = () => useMainStore((state) => !!state.account);

export const useMutations = () => useMainStore((state) => state.mutations);
