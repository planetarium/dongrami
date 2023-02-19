import { Button, Flex, FlexProps, Text } from '@chakra-ui/react';
import { computeAddress } from 'ethers/lib/utils';
import { useMainMutations, usePublicKey } from '../store/main';
import { HexToUint8Array } from '../utils/Uint8Array';

export function AddressSection(props: FlexProps) {
  const publicKey = usePublicKey();
  const { clear } = useMainMutations();

  if (!publicKey) {
    return null;
  }

  return (
    <Flex gap="2" alignItems="center" {...props}>
      <Text whiteSpace="nowrap" fontWeight="bold">
        Address
      </Text>
      <Text
        width="0"
        color="gray.600"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        flexGrow="1"
      >
        {computeAddress(HexToUint8Array(publicKey))}
      </Text>
      <Button size="sm" onClick={clear}>
        Use another key
      </Button>
    </Flex>
  );
}
