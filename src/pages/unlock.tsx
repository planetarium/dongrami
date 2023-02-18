import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAccountFromV3 } from '@planetarium/account-web';
import { computeAddress } from 'ethers/lib/utils';
import { FormEvent, useState } from 'react';
import { useKeystore, useMainMutations, usePublicKey } from '../store/main';
import { HexToUint8Array } from '../utils/Uint8Array';

export function UnlockPage() {
  const keystore = useKeystore();
  const publicKey = usePublicKey();
  const { setAccount, clear } = useMainMutations();

  const [passphrase, setPassphrase] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const authenticate = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!keystore) {
      return;
    }

    if (!passphrase) {
      setLoading(false);
      toast({
        title: 'Error',
        description: 'Please enter your passphrase.',
        status: 'error',
      });
      return;
    }

    try {
      const account = getAccountFromV3(keystore, passphrase);
      setAccount(account, await account.getPublicKey());
    } catch (e: unknown) {
      setLoading(false);

      if (!(e instanceof Error)) {
        toast({
          title: 'Error',
          description:
            'Unknown error occured while getting account from key file. Please try again.',
          status: 'error',
        });
        return;
      }

      toast({
        title: 'Error',
        description: e.message,
        status: 'error',
      });
    }
  };

  if (!publicKey) {
    return null;
  }

  return (
    <Flex as="form" gap="3" flexDir="column" onSubmit={authenticate}>
      <Flex gap="2" justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="md">
          Unlock Keystore
        </Heading>
        <Button size="sm" onClick={clear}>
          Use another key
        </Button>
      </Flex>
      <Flex gap="2">
        <Text whiteSpace="nowrap">Address</Text>
        <Text
          fontWeight="bold"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {computeAddress(HexToUint8Array(publicKey))}
        </Text>
      </Flex>
      <FormControl isRequired>
        <FormLabel>Passphrase</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FontAwesomeIcon} icon={faKey} textColor="gray.500" />
          </InputLeftElement>
          <Input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <Button
        w="full"
        type="submit"
        isDisabled={!passphrase}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </Flex>
  );
}
