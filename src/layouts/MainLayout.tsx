import { Center, Grid, GridItem } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { Title } from '../components/Title';

const select = <T,>(narrow: T | null, wide: T | null) => [
  narrow,
  narrow,
  narrow,
  narrow,
  wide,
];

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <Center h="100%">
      <Grid
        width={select('60ch', '120ch')}
        rounded="2xl"
        shadow="2xl"
        p="6"
        gap="4"
        templateColumns={select('1fr', '1fr 1fr')}
      >
        <GridItem colSpan={select(1, 2)}>
          <Title />
        </GridItem>
        {children}
      </Grid>
    </Center>
  );
}
