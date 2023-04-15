import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useMemo } from 'react';
import {
  useActionMutations,
  useActionState,
  useActionType,
} from 'store/action';

type Props = {
  flatKey: string;
};

const getKeyName = (key: string) => {
  const split = key.split('__');
  if (split[split.length - 1].trim() === '') {
    return split[split.length - 2];
  }
  return split[split.length - 1];
};

const camelCaseToWords = (str: string) => {
  const words = str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1 $2');
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const handleTypeName = (type?: string) => {
  if (type === '__array') return 'Array';
  if (type === '__object') return 'Object';
  return type;
};

export function ActionParameter({ flatKey }: Props) {
  const name = useMemo(() => camelCaseToWords(getKeyName(flatKey)), [flatKey]);

  const type = useActionType(flatKey);
  const [value, setValue] = useActionState(flatKey);
  const { appendValue } = useActionMutations();

  const isArray = type === '__array';
  const onAddItem = () => appendValue(flatKey);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  const isInvalid = useMemo(() => {
    if (type === 'Address') {
      return ethers.utils.isAddress(value);
    }
  }, [type, value]);

  let Component: React.ReactElement | null = null;
  if (type === 'Address') {
    Component = <Input type="text" value={value} onChange={onChange} />;
  }

  return (
    <FormControl pl="3" mt="3" isInvalid={isInvalid}>
      <Flex alignItems="center">
        <FormLabel my="0">{name}</FormLabel>
        <Text as="span" color="gray.500" fontSize="sm">
          {handleTypeName(type)}
        </Text>
        <Spacer />
        {isArray && (
          <Button size="sm" onClick={onAddItem}>
            Add Item
          </Button>
        )}
      </Flex>
      {Component}
    </FormControl>
  );
}
