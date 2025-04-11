import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import { Input, Button, HStack } from '@chakra-ui/react';

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack mb={4}>
        <Input
          placeholder="Add todo..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Button type="submit" colorScheme="blue">Add</Button>
      </HStack>
    </form>
  );
};

export default TodoForm;