import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { EndpointType } from '../types/endpoint';

type EndpointState = {
  endpoints: EndpointType[];
  tempEndpoint?: EndpointType;
  currentEndpointUrl: string;
  setEndpoints: (endpoints: EndpointType[]) => void;
  setTempEndpoint: (endpoint: EndpointType) => void;
  setCurrentEndpoint: (endpoint: string) => void;
};

export const autoEndpoint: EndpointType = {
  label: 'Auto Select',
  value: '',
  lastIndex: undefined,
};

const useEndpointState = create<EndpointState>()(
  devtools((set) => ({
    endpoints: [
      autoEndpoint,
      {
        label: 'Main RPC - 1',
        value: 'http://9c-main-rpc-1.nine-chronicles.com/graphql',
        lastIndex: undefined,
      },
      {
        label: 'Main RPC - 2',
        value: 'http://9c-main-rpc-2.nine-chronicles.com/graphql',
        lastIndex: undefined,
      },
      {
        label: 'Main RPC - 3',
        value: 'http://9c-main-rpc-3.nine-chronicles.com/graphql',
        lastIndex: undefined,
      },
      {
        label: 'Main RPC - 4',
        value: 'http://9c-main-rpc-4.nine-chronicles.com/graphql',
        lastIndex: undefined,
      },
      {
        label: 'Main RPC - 5',
        value: 'http://9c-main-rpc-5.nine-chronicles.com/graphql',
        lastIndex: undefined,
      },
      {
        label: 'Main Full State',
        value: 'https://9c-main-full-state.planetarium.dev/graphql',
        lastIndex: undefined,
      },
      {
        label: 'Onboarding Cluster - sts-headless-query-0 Pod',
        value:
          'http://a5bba99adb503495baa274a7e06a91bb-225412308.us-east-2.elb.amazonaws.com:23061/graphql',
        lastIndex: undefined,
      },
      {
        label: 'Onboarding Cluster - sts-headless-transfer-0 Pod',
        value:
          'http://a0da6ab2a59a546e6b632a6cb9c0a577-498991761.us-east-2.elb.amazonaws.com:23061/graphql',
        lastIndex: undefined,
      },
      {
        label: 'Main Cluster - explorer-0 Pod',
        value: 'https://d131807iozwu1d.cloudfront.net/graphql',
        lastIndex: undefined,
      },
      {
        label: 'Main Cluster - main-miner-2-0 Pod',
        value: 'https://9c-miner.planetarium.dev/graphql',
        lastIndex: undefined,
      },
    ],
    tempEndpoint: undefined,
    currentEndpointUrl: '',
    setEndpoints: (endpoints: EndpointType[]) =>
      set((state) => ({ ...state, endpoints })),
    setTempEndpoint: (endpoint: EndpointType) =>
      set((state) => ({ ...state, tempEndpoint: endpoint })),
    setCurrentEndpoint: (endpoint: string) =>
      set((state) => ({ ...state, currentEndpointUrl: endpoint })),
  }))
);

export const useEndpoints = () => useEndpointState((state) => state.endpoints);
export const useTempEndpoint = () =>
  useEndpointState((state) => state.tempEndpoint);
export const useLastIndex = () =>
  useEndpointState((state) => {
    if (!state.tempEndpoint) {
      return Math.max(...state.endpoints.map((e) => e.lastIndex || 0));
    }
    return Math.max(
      ...[...state.endpoints, state.tempEndpoint].map((e) => e.lastIndex || 0)
    );
  });
export const useCurrentEndpoint = () =>
  useEndpointState((state) =>
    state.endpoints.find((e) => e.value === state.currentEndpointUrl)
  );

export const useEndpointMutations = () =>
  useEndpointState((state) => ({
    setEndpoints: state.setEndpoints,
    setTempEndpoint: state.setTempEndpoint,
    setCurrentEndpoint: state.setCurrentEndpoint,
  }));
