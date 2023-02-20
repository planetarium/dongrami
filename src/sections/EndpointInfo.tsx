import {
  Box,
  Circle,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Play } from '../assets/icons';
import { useCurrentEndpoint, useLastIndex } from '../store/endpoint';

export function EndpointInfoSecion() {
  const { isOpen, onToggle } = useDisclosure();
  const currentEndpoint = useCurrentEndpoint();

  const lastIndex = useLastIndex();

  if (!currentEndpoint) {
    return null;
  }

  const open = isOpen ? 'block' : 'none';

  const indexDiff = currentEndpoint.lastIndex
    ? lastIndex - currentEndpoint.lastIndex
    : -Infinity;
  const status = indexDiff !== -Infinity && indexDiff < 16;

  return (
    <Box mt="3">
      <Flex alignItems="center" gap="2">
        <Icon
          as={Play}
          onClick={onToggle}
          transition="transform 0.2s ease-in-out"
          transform={isOpen ? 'rotate(90deg)' : undefined}
          _hover={{
            bgColor: 'gray.100',
          }}
          display={['block', 'block', 'block', 'block', 'none']}
        />
        <Heading as="h3" size="md">
          Endpoint Info
        </Heading>
        <Circle bgColor={status ? 'green.500' : 'red.500'} size="3" />
      </Flex>
      <Grid
        display={[open, open, open, open, 'grid']}
        ml={['6', '6', '6', '6', 0]}
        mt="1"
        gap="1"
        templateColumns="auto 1fr"
        alignItems="start"
      >
        <GridItem>
          <Heading as="h4" size="sm" lineHeight="24px">
            URL
          </Heading>
        </GridItem>
        <GridItem>
          <Link href={currentEndpoint.value} size="sm" wordBreak="break-all">
            {currentEndpoint.value}
          </Link>
        </GridItem>
        <GridItem>
          <Heading as="h4" size="sm" lineHeight="24px">
            Health
          </Heading>
        </GridItem>
        <GridItem>
          <Text size="sm" color={status ? 'green.500' : 'red.500'}>
            {status ? 'Healthy ' : 'Unhealthy '}
            {indexDiff === -Infinity ? '(Not responsive)' : `(${indexDiff})`}
          </Text>
        </GridItem>
        <GridItem>
          <Heading as="h4" size="sm" lineHeight="24px">
            Last Block Index
          </Heading>
        </GridItem>
        <GridItem>
          <Text size="sm">{currentEndpoint.lastIndex || 'N/A'}</Text>
        </GridItem>
      </Grid>
    </Box>
  );
}
