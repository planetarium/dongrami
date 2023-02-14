import { useState } from "react";
import { PrivateKeyGetter } from "./components/PrivateKeyGetter";
import { ActionForm } from "./components/ActionForm";
import { TransactionStatus } from "./components/TransactionStatus";
import { Container } from "@chakra-ui/react";

function App() {

  return (
      <Container className="App" maxW='2xl' borderRadius='1rem' backgroundColor="magenta" centerContent>
        <PrivateKeyGetter />
        <ActionForm />
        <TransactionStatus />
      </Container>
  );
}

export default App;
