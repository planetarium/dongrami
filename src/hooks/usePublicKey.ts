import { Account } from '@planetarium/sign';
import { Reducer, useEffect, useReducer } from 'react';
import { Uint8ArrayToHex } from '../utils/Uint8Array';

type PublicKeyState = {
  isLoading: boolean;
  isError: boolean;
  publicKey: string | null;
};

type PublicKeyAction =
  | {
      type: 'LOADING' | 'ERROR';
    }
  | {
      type: 'SUCCESS';
      data: string;
    };

const reducer: Reducer<PublicKeyState, PublicKeyAction> = (_, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        isLoading: true,
        isError: false,
        publicKey: null,
      };
    case 'SUCCESS':
      return {
        isLoading: false,
        isError: false,
        publicKey: action.data,
      };
    case 'ERROR':
      return {
        isLoading: false,
        isError: true,
        publicKey: null,
      };
    default:
      throw new Error(`Unhandled action: ${action}`);
  }
};

export const usePublicKey = (account: Account | null) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    publicKey: null,
  });

  if (!account) {
    return {
      isLoading: false,
      isError: false,
      publicKey: null,
    };
  }

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await account.getPublicKey();
      dispatch({ type: 'SUCCESS', data: Uint8ArrayToHex(data) });
    } catch (e) {
      dispatch({ type: 'ERROR' });
    }
  };

  useEffect(() => void fetchData(), [account]);

  return state;
};
