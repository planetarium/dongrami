import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useMemo, useState } from 'react';
import { useLib9c } from '../hooks/useLib9c';
import { getActions } from '../utils/lib9c';

export function ActionSection() {
  const lib9c = useLib9c();

  const [action, setAction] = useState<{ label: string; value: string } | null>(
    null
  );

  const actionTypes = useMemo(() => {
    if (!lib9c) {
      return [];
    }

    return getActions(lib9c).map((f) => ({ label: f, value: f }));
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

  // console.log(lib9c[action.value as keyof typeof lib9c].toString());
  //
  // function battle_arena(plainValue) {
  //   return buildActionWrapper('battle_arena', plainValue);
  // }
  //
  // FUCK

  return (
    <Box>
      <Heading as="h2" size="lg">
        Create Action
      </Heading>
      <Box as="form">
        <FormControl mt="3" isRequired>
          <FormLabel>Action Type</FormLabel>
          <Select
            options={actionTypes}
            value={action}
            onChange={(e) => setAction(e)}
          />
        </FormControl>
        <Button mt="3" type="submit" w="full">
          Send
        </Button>
      </Box>
    </Box>
  );
}
