import { Box, BoxProps, Heading, Text } from '@chakra-ui/react';
import { usePublicKey } from '../store/main';

export function PublicKeySection(props: BoxProps) {
  const publicKey = usePublicKey();

  return (
    <Box {...props}>
      <Heading as="h2" size="lg">
        Public Key
      </Heading>
      <Text color="black">{publicKey}</Text>
    </Box>
  );
}
