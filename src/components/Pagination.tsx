import React from 'react';
import { useTodos } from '../context/TodoContext';
import { HStack, Button, Text } from '@chakra-ui/react';

const Pagination: React.FC = () => {
  const { page, setPage } = useTodos();

  return (
    <HStack mt={6} justify="center">
      <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
      <Text>Page {page}</Text>
      <Button onClick={() => setPage(p => p + 1)}>Next</Button>
    </HStack>
  );
};

export default Pagination;