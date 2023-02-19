import axios, { AxiosResponse } from 'axios';
import {
  GetLastBlockIndexDocument,
  GetLastBlockIndexQuery,
  GetLastBlockIndexQueryVariables,
} from '../graphql/sdk.main';
import { EndpointType } from '../types/endpoint';
import { GraphQLBody } from '../types/graphql';

// FIXME: Type Definition is dirty
export async function loadSingleEndpointHealth(
  endpoint: EndpointType
): Promise<EndpointType> {
  try {
    const {
      data: { data },
    } = await axios.post<
      never,
      AxiosResponse<{ data: GetLastBlockIndexQuery }>,
      GraphQLBody<GetLastBlockIndexQueryVariables>
    >(endpoint.value, {
      query: GetLastBlockIndexDocument,
      variables: { offset: 0 },
    });
    const result = data.chainQuery.blockQuery?.blocks[0].index as number;
    return {
      ...endpoint,
      lastIndex: result,
    };
  } catch (e) {
    return endpoint;
  }
}

export async function loadAllEndpointHealth(
  endpoints: EndpointType[],
  setEndpoints: (endpoints: EndpointType[]) => void,
  tempEndpoint: EndpointType | undefined,
  setTempEndpoint: (endpoint: EndpointType) => void
) {
  if (tempEndpoint) {
    setTempEndpoint(await loadSingleEndpointHealth(tempEndpoint));
  }

  const newEndpoints = await Promise.all(
    endpoints.map(loadSingleEndpointHealth)
  );
  setEndpoints(newEndpoints);
}
