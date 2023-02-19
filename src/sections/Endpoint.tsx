import { Box, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { EndpointSelect } from '../components/EndpointSelect';
import { EndpointType } from '../store/endpoint';
import { EndpointInfoSecion } from './EndpointInfo';

export function EndpointSection() {
  const [endpoint, setEndpoint] = useState<EndpointType | undefined>();
  const endpointState = { endpoint, setEndpoint };

  return (
    <Box>
      <Heading as="h2" size="lg" mr="2" mb="2">
        Endpoint
      </Heading>
      <EndpointSelect {...endpointState} />
      {endpoint && <EndpointInfoSecion url={endpoint.value} />}
    </Box>
  );
}
