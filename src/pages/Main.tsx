import { Flex } from '@chakra-ui/react';
import { AddressSection } from '../sections/Address';
import { EndpointSection } from '../sections/Endpoint';

export function MainPage() {
  return (
    <Flex gap="3" flexDir="column">
      <AddressSection />
      <EndpointSection />
    </Flex>
  );
}
