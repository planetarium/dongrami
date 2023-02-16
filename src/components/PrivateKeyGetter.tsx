import { Box, Button, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWorker } from "../store/main";
import { WorkerMessage } from "../types/message";

export const PrivateKeyGetter = () => {
  const worker = useWorker();

  const [keyFile, setKeyFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (!worker || !keyFile) {
      return;
    }

    worker.postMessage<WorkerMessage>({
      key: "KEY_FILE_READ",
      data: {
        file: keyFile,
      },
    });
  }, [keyFile]);

  return (
    <Box p={2} bg="blue.300">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            // const acc = await getAccountFromV3(keyFile, password);
            // console.log(acc.getPublicKey());
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <FormLabel>Web3 Secret Storage</FormLabel>
        <Input
          type="file"
          name="keyFile"
          onChange={(e) => {
            if (e.target.files && e.target.files.length === 1) {
              setKeyFile(e.target.files[0]);
            }
          }}
        ></Input>
        <FormLabel>Passphrase</FormLabel>
        <Input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};
