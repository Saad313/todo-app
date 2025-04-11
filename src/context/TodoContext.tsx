import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  page: number;
  fetchTodos: (page: number) => void;
  addTodo: (title: string) => void;
  editTodo: (id: number, title: string) => void;
  deleteTodo: (id: number) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const fetchTodos = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?_page=${page}&_limit=5`);
      const data = await res.json();
      setTodos(data);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchTodos(page);
  }, [page]);

  const addTodo = (title: string) => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      title,
      completed: false,
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const editTodo = (id: number, title: string) => {
    setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, title } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, page, fetchTodos, addTodo, editTodo, deleteTodo, setPage, loading }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be used within a TodoProvider');
  return context;
};