import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { ChangeEvent, ReactElement, useMemo } from 'react';
import { useActionState, useActionType } from 'store/action';

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

export function ActionParameter({ flatKey }: Props) {
  const [value, setValue] = useActionState(flatKey);

  const name = useMemo(() => getKeyName(flatKey), [flatKey]);
  const type = useActionType(flatKey);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  const checkInvalid = () => {
    if (type === 'Address') {
      return ethers.utils.isAddress(value);
    }
  };

  let Component: ReactElement | null = null;
  if (type === 'Address') {
    Component = <Input type="text" value={value} onChange={onChange} />;
  }

  return (
    <FormControl isInvalid={checkInvalid()}>
      <FormLabel>{name}</FormLabel>
      {type}
    </FormControl>
  );
}
