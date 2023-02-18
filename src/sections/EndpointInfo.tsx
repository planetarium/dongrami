import {
  Box,
  Circle,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Play } from '../assets/icons';
import { EndpointType } from '../store/endpoint';

type EndpointInfoSectionProps = {
  endpoint: EndpointType;
};

export function EndpointInfoSecion({ endpoint }: EndpointInfoSectionProps) {
  const { isOpen, onToggle } = useDisclosure();

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
        />
        <Heading as="h3" size="md">
          Endpoint Info
        </Heading>
        <Circle bgColor="green.500" size="3" />
      </Flex>
      <Grid
        display={isOpen ? 'grid' : 'none'}
        ml="6"
        templateColumns="minmax(auto, 100px) 1fr"
        alignItems="center"
      >
        <GridItem>
          <Heading as="h4" size="sm">
            URL
          </Heading>
        </GridItem>
        <GridItem>
          <Text size="sm">{endpoint.value}</Text>
        </GridItem>
        <GridItem>
          <Heading as="h4" size="sm">
            Health
          </Heading>
        </GridItem>
        <GridItem>
          <Text size="sm" color="green.500">
            Good (3)
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
}
