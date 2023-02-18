import { Button, Flex, Heading, Link, Spacer, Text } from '@chakra-ui/react';
import { Planetarium } from '../assets/icons';
import { useAccountState, useMainMutations } from '../store/main';

export function Title() {
  const state = useAccountState();
  const { clear } = useMainMutations();

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
      <Spacer />
      {state && (
        <Button
          size="sm"
          onClick={() => clear()}
          _hover={{
            bgColor: 'red.500',
            color: 'white',
          }}
        >
          Disconnect Key
        </Button>
      )}
    </Flex>
  );
}
