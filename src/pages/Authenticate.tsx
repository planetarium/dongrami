import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from '@chakra-ui/react';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAccountFromV3 } from '@planetarium/account-web';
import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  useKeystore,
  useMessage,
  useMutations,
  useWorker,
} from '../store/main';
import { readKeyFile } from '../worker/handlers';

export function AuthenticatePage() {
  const worker = useWorker();
  const message = useMessage();
  const keystore = useKeystore();

  const { setKeystore, setAccount } = useMutations();

  const [keyFile, setKeyFile] = useState<File | null>(null);
  const [passsphrase, setPassphrase] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const toast = useToast();

  // Read Key File on Key File Change
  useEffect(() => readKeyFile(worker, keyFile), [keyFile]);

  // Set Keystore on Worker Message
  useEffect(() => {
    if (message?.key === 'KEY_FILE_READ') {
      setKeystore(message.data.content);
    }

    if (message?.key === 'ERROR_KEY_FILE_READ') {
      toast({
        title: 'Error',
        description: 'Failed to read key file. Please try again.',
        status: 'error',
      });
    }
  }, [message]);

  const authenticate = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!keystore) {
      setLoading(false);
      setKeyFile(null);
      toast({
        title: 'Error',
        description: 'Failed to read key file. Please try again.',
        status: 'error',
      });
      return;
    }

    if (!passsphrase) {
      setLoading(false);
      toast({
        title: 'Error',
        description: 'Please enter your passphrase.',
        status: 'error',
      });
      return;
    }

    try {
      setAccount(getAccountFromV3(keystore, passsphrase));
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

    setLoading(false);
  };

  return (
    <Box
      as="form"
      display="flex"
      gap="3"
      flexDir="column"
      onSubmit={authenticate}
    >
      <FormControl isRequired>
        <FormLabel>Web3 Secret Storage File</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FontAwesomeIcon} icon={faFile} textColor="gray.500" />
          </InputLeftElement>
          <Input
            type="text"
            readOnly
            value={keyFile ? keyFile.name : ''}
            onChange={() => {
              void 0;
            }}
            onClick={() => inputFileRef.current && inputFileRef.current.click()}
          />
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Passphrase</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FontAwesomeIcon} icon={faKey} textColor="gray.500" />
          </InputLeftElement>
          <Input
            type="password"
            value={passsphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            disabled={!keystore}
          />
        </InputGroup>
      </FormControl>
      <Input
        type="file"
        display="none"
        ref={inputFileRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length === 1) {
            setKeyFile(e.target.files[0]);
          }
        }}
      />
      <Button
        w="full"
        type="submit"
        isDisabled={!keystore || !passsphrase}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </Box>
  );
}
