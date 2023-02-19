import { CreatableSelect } from 'chakra-react-select';
import { useEndpointMutations, useEndpoints } from '../store/endpoint';
import { EndpointType } from '../types/endpoint';
import { loadSingleEndpointHealth } from '../utils/endpoint';

type EndpointSectionProps = {
  endpoint: EndpointType | undefined;
  setEndpoint: (endpoint: EndpointType | undefined) => void;
};

export function EndpointSelect({
  endpoint,
  setEndpoint,
}: EndpointSectionProps) {
  const endpoints = useEndpoints();
  const { setTempEndpoint } = useEndpointMutations();

  return (
    <CreatableSelect
      value={endpoint || undefined}
      onChange={(value) => value && setEndpoint(value)}
      placeholder="Endpoint Address"
      options={endpoints}
      onCreateOption={async (value) => {
        const newEndpoint = {
          value,
          label: value,
          lastIndex: undefined,
        };
        setTempEndpoint(await loadSingleEndpointHealth(newEndpoint));
        setEndpoint(newEndpoint);
      }}
    />
  );
}
