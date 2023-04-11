import { Flex, Link, Text } from '@chakra-ui/react';
import { Planetarium } from '../assets/icons';

export function Title() {
  return (
    <Flex alignItems="center" flexDir={['column', 'row']}>
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
        fontSize="28px"
        lineHeight="32px"
      >
        <Planetarium width="32px" height="32px" fill="#3e2a8c" />
        Planetarium
      </Link>
      <Text
        as="span"
        display="block"
        w="100%"
        fontSize="28px"
        lineHeight="32px"
        textAlign={['center', 'left']}
      >
        &nbsp;Tx Signer
      </Text>
    </Flex>
  );
}
