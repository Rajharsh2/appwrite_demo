import React from 'react';
import CreateTodoPage from '../create-todo';
import {getAllTodos, getCompletedTodos} from '@/service/todo';
import {toast} from 'sonner';
import {Todo} from '@/types/todo';

const CompletedTodo = async () => {
  const todos = await getCompletedTodos();
  if (todos.type === 'error') {
    toast.error(todos.errors);
    return;
  }
  return (
    <>
      <CreateTodoPage todoss={todos.data.documents as Todo[]} />
    </>
  );
};

export default CompletedTodo;
