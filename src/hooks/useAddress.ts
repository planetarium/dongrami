import { Account, deriveAddress } from '@planetarium/sign';
import { Reducer, useEffect, useReducer } from 'react';

type AddressState = {
  isLoading: boolean;
  isError: boolean;
  address: string | null;
};

type AddressAction =
  | {
      type: 'LOADING' | 'ERROR';
    }
  | {
      type: 'SUCCESS';
      data: string;
    };

const reducer: Reducer<AddressState, AddressAction> = (_, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        isLoading: true,
        isError: false,
        address: null,
      };
    case 'SUCCESS':
      return {
        isLoading: false,
        isError: false,
        address: action.data,
      };
    case 'ERROR':
      return {
        isLoading: false,
        isError: true,
        address: null,
      };
    default:
      throw new Error(`Unhandled action: ${action}`);
  }
};

export const useAddress = (account: Account | null) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    address: null,
  });

  if (!account) {
    return {
      isLoading: false,
      isError: false,
      address: null,
    };
  }

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await deriveAddress(account);
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR' });
    }
  };

  useEffect(() => void fetchData(), [account]);

  return state;
};
