// App.tsx
import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Pagination from './components/Pagination';
import { Box, Heading, Flex, Spinner } from '@chakra-ui/react';
import { useTodos } from './context/TodoContext';
import './App.css';

const App = () => {
  const { loading } = useTodos();

  return (
    <Flex
      minH="100vh"
      bg="gray.50"
      p={4}
    >
      <Box minW="600px" w="100%" p={8} bg="white" boxShadow="md" borderRadius="md">
        <Heading mb={6} textAlign="center">
          React ToDo App
        </Heading>
        {loading ? (
          <Flex justify="center" align="center" h="200px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <TodoForm />
            <TodoList />
            <Pagination />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default App;
