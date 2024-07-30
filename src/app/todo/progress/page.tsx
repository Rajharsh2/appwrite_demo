import React from 'react';
import CreateTodoPage from '../create-todo';
import {getAllTodos, getCompletedTodos, getPendingTodos} from '@/service/todo';
import {toast} from 'sonner';
import {Todo} from '@/types/todo';

const PendingTodo = async () => {
  const todos = await getPendingTodos();
  if (todos.type === 'error') {
    toast.error(todos.errors);
    return;
  }
  return (
    <>
      <CreateTodoPage todos={(todos.data.documents as Todo[]) ?? []} />
    </>
  );
};

export default PendingTodo;
