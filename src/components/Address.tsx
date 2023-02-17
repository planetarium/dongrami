import { Text, TextProps } from '@chakra-ui/react';
import { useAddress } from '../hooks/useAddress';
import { useAccount } from '../store/main';

export function Address(props: TextProps) {
  const account = useAccount();

  const { isError, isLoading, address } = useAddress(account);

  if (isError) {
    return (
      <Text color="red" {...props}>
        Error
      </Text>
    );
  }

  if (isLoading) {
    return (
      <Text color="gray.600" {...props}>
        Loading...
      </Text>
    );
  }

  if (publicKey) {
    return (
      <Text color="black" {...props}>
        {address}
      </Text>
    );
  }

  return null;
}
