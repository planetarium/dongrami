import { Box, Heading } from '@chakra-ui/react';
import { EndpointSelect } from '../components/EndpointSelect';
import { EndpointInfoSecion } from './EndpointInfo';

export function EndpointSection() {
  return (
    <Box>
      <Heading as="h2" size="lg" mr="2" mb="2">
        Endpoint
      </Heading>
      <EndpointSelect />
      <EndpointInfoSecion />
    </Box>
  );
}
