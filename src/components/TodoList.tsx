import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import { Box, Input, Button, VStack, HStack, Text } from '@chakra-ui/react';

const TodoList: React.FC = () => {
  const { todos, editTodo, deleteTodo } = useTodos();
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const startEdit = (id: number, currentText: string) => {
    setEditId(id);
    setEditText(currentText);
  };

  const saveEdit = (id: number) => {
    editTodo(id, editText);
    setEditId(null);
    setEditText('');
  };

  return (
    <VStack spacing={4} align="stretch">
      {todos?.length && todos?.map(todo => (
        <Box key={todo.id} p={4} borderWidth={1} borderRadius="md">
          {editId === todo.id ? (
            <HStack>
              <Input
                value={editText}
                onChange={e => setEditText(e.target.value)}
              />
              <Button onClick={() => saveEdit(todo.id)} colorScheme="green">Save</Button>
              <Button onClick={() => setEditId(null)} colorScheme="gray">Cancel</Button>
            </HStack>
          ) : (
            <HStack justify="space-between">
              <Text textAlign={"left"}>{todo.title}</Text>
              <HStack>
                <Button size="sm" onClick={() => startEdit(todo.id, todo.title)}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => deleteTodo(todo.id)}>Delete</Button>
              </HStack>
            </HStack>
          )}
        </Box>
      ))}
    </VStack>
  );
};

export default TodoList;