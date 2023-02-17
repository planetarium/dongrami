import { Text, TextProps } from '@chakra-ui/react';
import { usePublicKey } from '../hooks/usePublicKey';
import { useAccount } from '../store/main';

export function PublicKey(props: TextProps) {
  const account = useAccount();

  const { isError, isLoading, publicKey } = usePublicKey(account);

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
        {publicKey}
      </Text>
    );
  }

  return null;
}
