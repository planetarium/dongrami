import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../graphql/sdk.main';
import { EndpointType } from '../types/endpoint';

export async function loadSingleEndpointHealth(
  endpoint: EndpointType
): Promise<EndpointType> {
  try {
    const client = new GraphQLClient(endpoint.value);
    const sdk = getSdk(client);
    const data = await sdk.getLastBlockIndex({ offset: 0 });
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
