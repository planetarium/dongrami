import { Center, Container, Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { Title } from '../components/Title';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <Center h="100%">
      <Container
        as={Flex}
        flexDir="column"
        rounded="2xl"
        shadow="2xl"
        p="6"
        gap="4"
      >
        <Title />
        {children}
      </Container>
    </Center>
  );
}
