import { Input, Text } from '@chakra-ui/react';
import { ParameterComponentProps } from 'types/parameter';

const isHex = (str: string) => {
  const re = /^0x?[0-9a-fA-F]+$/;
  return re.test(str);
};

const isBase64 = (str: string) => {
  const re = /^[0-9a-zA-Z]+[=]{0,2}$/;
  return re.test(str);
};

export const Uint8ArrayParameter = ({
  setInvalid,
  setValue,
  value,
}: ParameterComponentProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setInvalid(
      !!e.currentTarget.value &&
        !isHex(e.currentTarget.value) &&
        !isBase64(e.currentTarget.value)
    );
  };

  return (
    <>
      <Input type="text" value={value} onChange={onChange} />
      <Text
        ml="1"
        fontSize="12"
        color="gray.500"
        display={!isHex(value) && !isBase64(value) ? 'none' : 'block'}
      >
        Will be interpreted as {isHex(value) ? 'Hex' : 'Base64'} Value
      </Text>
    </>
  );
};
