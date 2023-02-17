import { Box, Heading } from '@chakra-ui/react';
import { Address } from '../components/Address';
import { useAccount } from '../store/main';

export function MainPage() {
  const account = useAccount();

  return (
    <Box gap="3" flexDir="column">
      <Heading size="md">Address</Heading>
      <Address />
      <form></form>
    </Box>
  );
}
