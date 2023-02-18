import { Box, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { EndpointSelect } from '../components/EndpointSelect';
import { EndpointInfoSecion } from './EndpointInfo';

export type EndpointType = {
  label: string;
  value: string;
  lastIndex: number | undefined;
};

export function EndpointSection() {
  const [endpoint, setEndpoint] = useState<EndpointType | undefined>();
  const endpointState = { endpoint, setEndpoint };

  console.log(endpoint);

  return (
    <Box>
      <Heading as="h2" size="lg" mr="2" mb="2">
        Endpoint
      </Heading>
      <EndpointSelect {...endpointState} />
      {endpoint && <EndpointInfoSecion endpoint={endpoint} />}
    </Box>
  );
}
