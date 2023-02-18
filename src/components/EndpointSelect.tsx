import { CreatableSelect } from 'chakra-react-select';
import { EndpointType, useEndpoints } from '../store/endpoint';

type EndpointSectionProps = {
  endpoint: EndpointType | undefined;
  setEndpoint: (endpoint: EndpointType | undefined) => void;
};

export function EndpointSelect({
  endpoint,
  setEndpoint,
}: EndpointSectionProps) {
  const endpoints = useEndpoints();

  return (
    <CreatableSelect
      value={endpoint || undefined}
      onChange={(value) => value && setEndpoint(value)}
      placeholder="Endpoint Address"
      options={endpoints}
    />
  );
}
