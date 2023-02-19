import { Center, Container, Flex } from '@chakra-ui/react';
import { ComponentType, PropsWithChildren } from 'react';
import { Title } from '../components/Title';

export type Page = ComponentType & {
  Layout?: React.FC<PropsWithChildren>;
};

export function getLayout(page: Page): React.FC<PropsWithChildren> {
  if (!page.Layout) {
    return DefaultLayout;
  }

  return page.Layout;
}

export function DefaultLayout({ children }: PropsWithChildren) {
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
