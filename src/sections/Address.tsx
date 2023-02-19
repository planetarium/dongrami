import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { computeAddress } from 'ethers/lib/utils';
import { usePublicKey } from '../store/main';
import { HexToUint8Array } from '../utils/Uint8Array';

export function AddressSection(props: FlexProps) {
  const publicKey = usePublicKey();

  if (!publicKey) {
    return null;
  }

  return (
    <Flex gap="2" {...props}>
      <Text whiteSpace="nowrap" fontWeight="bold">
        Address
      </Text>
      <Text
        color="gray.600"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {computeAddress(HexToUint8Array(publicKey))}
      </Text>
    </Flex>
  );
}
