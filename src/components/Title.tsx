import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Planetarium } from '../assets/icons';

export function Title() {
  return (
    <Flex alignItems="center" gap="4">
      <Heading as="h1" size="xl">
        Dongrami
      </Heading>
      <Text display="flex" alignItems="center">
        <Link
          display="flex"
          alignItems="center"
          href="https://github.com/planetarium"
          color="#3e2a8c"
          gap="1"
          textDecoration="none"
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Planetarium width="16px" height="16px" fill="#3e2a8c" />
          Planetarium
        </Link>
        &nbsp;Tx Signer
      </Text>
    </Flex>
  );
}
