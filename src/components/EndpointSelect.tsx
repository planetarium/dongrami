import { CreatableSelect } from 'chakra-react-select';
import {
  useCurrentEndpoint,
  useEndpointMutations,
  useEndpoints,
} from '../store/endpoint';
import { loadSingleEndpointHealth } from '../utils/endpoint';

export function EndpointSelect() {
  const endpoints = useEndpoints();
  const currentEndpoint = useCurrentEndpoint();
  const { setTempEndpoint, setCurrentEndpoint } = useEndpointMutations();

  return (
    <CreatableSelect
      value={currentEndpoint || undefined}
      onChange={(value) => value && setCurrentEndpoint(value.value)}
      placeholder="Endpoint Address"
      options={endpoints}
      onCreateOption={async (value) => {
        const newEndpoint = {
          value,
          label: value,
          lastIndex: undefined,
        };
        setTempEndpoint(await loadSingleEndpointHealth(newEndpoint));
        setCurrentEndpoint(newEndpoint.value);
      }}
    />
  );
}
