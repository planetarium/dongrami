import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useLib9c } from '../hooks/useLib9c';
import { Select } from 'chakra-react-select';
import { useMemo } from 'react';

export function ActionSection() {
  const lib9c = useLib9c();

  const actionTypes = useMemo(() => {
    if (!lib9c) {
      return [];
    }

    return Object.keys(lib9c)
      .filter((f) => !f.startsWith('deserialize'))
      .filter((f) => f[0] === f[0].toLowerCase())
      .filter((f) => !f.startsWith('_'))
      .filter(
        (f) =>
          ![
            'boot',
            'default',
            'attachSignature',
            'buildUnsignedTransaction',
            'serializeObjectAsDotnet',
            'toHex',
            'parseHex',
          ].includes(f)
      )
      .map((f) => ({ label: f, value: f }));
  }, [lib9c]);

  if (!lib9c) {
    return (
      <Box>
        <Heading as="h2" size="lg">
          Create Action
        </Heading>
        <Text my="6" textAlign="center">
          Loading lib9c-wasm...
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading as="h2" size="lg">
        Create Action
      </Heading>
      <Box as="form">
        <FormControl mt="3" isRequired>
          <FormLabel>Action Type</FormLabel>
          <Select options={actionTypes} />
        </FormControl>
        <Button mt="3" type="submit" w="full">
          Send
        </Button>
      </Box>
    </Box>
  );
}
