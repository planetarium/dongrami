import { Container, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { ActionForm } from "./components/ActionForm";
import { PrivateKeyGetter } from "./components/PrivateKeyGetter";
import { TransactionStatus } from "./components/TransactionStatus";
import { useMutations, useWorker } from "./store/main";
import { WorkerResultMessage } from "./types/message";

function App() {
  const worker = useWorker();
  const { setWorker } = useMutations();

  useEffect(() => {
    if (!worker && window.Worker) {
      const _worker = new Worker(new URL("../worker.js", import.meta.url));

      _worker.onmessage = (e: MessageEvent<WorkerResultMessage>) => {
        console.log(e);
      };

      setWorker(_worker);
    }
  }, [worker]);

  if (!window.Worker) {
    return (
      <Container
        className="App"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="xl">WebWorker is not supperted in this browser</Heading>
        <Text color="gray.700">WebWorker is required to run this service</Text>
      </Container>
    );
  }

  return (
    <Container
      className="App"
      maxW="2xl"
      borderRadius="1rem"
      backgroundColor="magenta"
      centerContent
    >
      <PrivateKeyGetter />
      <ActionForm />
      <TransactionStatus />
    </Container>
  );
}

export default App;
