import { Heading, Text } from '@chakra-ui/react';

export function ErrorPage() {
  return (
    <>
      <Heading size="xl" textAlign="center">
        Dongrami is unable to run in this browser
      </Heading>
      <Text color="gray.600" textAlign="center">
        WebWorker is required to run this service, but WebWorker is not
        supperted in this browser
      </Text>
    </>
  );
}
