import { Button, Flex, Heading } from '@chakra-ui/react';
import { AddressSection } from '../sections/Address';
import { EndpointSection } from '../sections/Endpoint';
import { useMainMutations } from '../store/main';

export function MainPage() {
  const { clear } = useMainMutations();

  return (
    <Flex gap="3" flexDir="column">
      <Flex gap="2" justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="lg">
          Sign Transaction
        </Heading>
        <Button size="sm" onClick={clear}>
          Use another key
        </Button>
      </Flex>
      <AddressSection />
      <EndpointSection />

      <Button w="full">Submit</Button>
    </Flex>
  );
}
