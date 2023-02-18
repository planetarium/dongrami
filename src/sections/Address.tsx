import { Box, BoxProps, Heading, Text, TextProps } from '@chakra-ui/react';
import { computeAddress } from 'ethers/lib/utils';
import { usePublicKey } from '../store/main';
import { HexToUint8Array } from '../utils/Uint8Array';

export function AddressSection(props: BoxProps) {
  const publicKey = usePublicKey();

  if (!publicKey) {
    return null;
  }

  return (
    <Box {...props}>
      <Heading as="h2" size="lg">
        Address
      </Heading>
      <Text color="gray.600">{computeAddress(HexToUint8Array(publicKey))}</Text>
    </Box>
  );
}
