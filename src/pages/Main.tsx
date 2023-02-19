import { Box, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { AddressSection } from '../sections/Address';
import { EndpointSection } from '../sections/Endpoint';
import { SendSection } from '../sections/SendSection';
import { EndpointType } from '../types/endpoint';
export function MainPage() {
  const [endpoint, setEndpoint] = useState<EndpointType | undefined>();
  const endpointState = { endpoint, setEndpoint };

  return (
    <>
      <Flex gap="3" flexDir="column">
        <Box>
          <Flex gap="2" justifyContent="space-between" alignItems="center">
            <Heading as="h2" size="lg">
              Sign Transaction
            </Heading>
          </Flex>
          <AddressSection />
        </Box>
        <EndpointSection {...endpointState} />
      </Flex>
      {endpoint && <SendSection />}
    </>
  );
}

MainPage.Layout = MainLayout;
