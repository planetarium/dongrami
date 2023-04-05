import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
} from '@chakra-ui/react';
import { useLib9c } from '../hooks/useLib9c';

export function ActionSection() {
  const lib9c = useLib9c();

  return (
    <Box>
      <Heading as="h2" size="lg">
        Create Action
      </Heading>
      <Flex as="form" gap="3" flexDir="column">
        <FormControl isRequired>
          <FormLabel>Reciever Address</FormLabel>
          <Input placeholder="Reciever Address" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Amount</FormLabel>
          <Input placeholder="Amount" />
        </FormControl>
        <Spacer />
        <Button type="submit" w="full">
          Send
        </Button>
      </Flex>
    </Box>
  );
}
