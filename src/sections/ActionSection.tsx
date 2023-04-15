import Actions from '@/actions.json';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { ActionParameter } from 'components/ActionParameter';
import { useLib9c } from 'hooks/useLib9c';
import { useEffect, useState } from 'react';
import { useActionFlat, useActionMutations } from 'store/action';

type SelectValueType = {
  label: keyof typeof Actions;
  value: keyof typeof Actions;
};

export function ActionSection() {
  const lib9c = useLib9c();

  const [action, setAction] = useState<SelectValueType | null>(null);

  const flat = useActionFlat();
  const { clear, setAction: setStoreAction } = useActionMutations();

  useEffect(() => {
    if (!action) {
      clear();
      return;
    }
    setStoreAction(action.value);
  }, [action]);

  const actionTypes = Object.keys(Actions)
    .sort()
    .map((a) => ({
      label: a,
      value: a,
    })) as SelectValueType[];

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
          <Select
            options={actionTypes}
            value={action}
            onChange={(e) => setAction(e)}
          />
        </FormControl>
        <Text mt="3" fontSize="md" fontWeight="medium">
          Action Parameters
        </Text>
        {flat.getKeys().map((key) => (
          <ActionParameter key={key} flatKey={key} />
        ))}
        <Button mt="3" type="submit" w="full">
          Send
        </Button>
      </Box>
    </Box>
  );
}
