'use client';
import React, {useState} from 'react';
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from '@/service/todo';
import {createEventQr, createQr} from '@/service/qrcode';
import Image from 'next/image';
import {toast} from 'sonner';
import {Todo} from '@/types/todo';
import {getAllSessions, getCurrentUser} from '@/service/auth';

const CreateTodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleBtn1 = async () => {
    console.log('button1 clicked');

    // const todo = await getTodoById('669cac18002397c62323');
    // if (todo.type === 'success') {
    //   setTodos([todo]);
    // }
    const todos = await getAllTodos();
    if (todos.type === 'error') {
      toast.error(todos.errors);
      return;
    }
    setTodos(todos.data.documents as Todo[]);
  };

  const handleBtn2 = async () => {
    console.log('Button 2 clicked');
    // const user = await getCurrentUser();
    const session = await getAllSessions();
    console.log(session);

    // const qrResult = await createEventQr('ticket1', 'event1', 'user1');
    // const todoData = {
    //   title: 'Appwrite',
    //   description: 'Explore appwrite to build backend',
    //   status: 'Completed',
    //   userId: '668f798600045d19ce3d',
    //   qrcode: qrResult?.href,
    // };
    // const createdTodo = await createTodo(todoData);
    // console.log(createdTodo);
    // const updatedTodo = await updateTodo(todos[0]['$id'], todos[0]);
    // console.log(updatedTodo);
    // const deletedTodo = await deleteTodo(createdTodo['$id']);
    // console.log(deletedTodo);
  };

  return (
    <div className="w-full text-center mx-auto mt-20">
      {/* {JSON.stringify(todos)} */}
      Welcome to todoPage
      <div>
        <button
          className="h-10 w-40 m-8 py-2 bg-blue-400 rounded-md text-base font-bold"
          type="button"
          onClick={handleBtn1}
        >
          Button 1
        </button>
        <button
          className="h-10 w-40 m-8 py-2 bg-blue-400 rounded-md text-base font-bold"
          type="button"
          onClick={handleBtn2}
        >
          Button 2
        </button>
      </div>
      <div>
        {todos.map((todo: Todo, index: number) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 flex">
            <div className=" mx-5 my-auto">
              <h2 className="text-xl font-bold">{todo.title}</h2>
              <h4 className="text-xl">{todo.description}</h4>
              <h2 className="text-xl font-semibold">{todo.status}</h2>
            </div>
            <Image
              src={todo.qrcode}
              alt={`QR code for ${todo.title}`}
              width={200}
              height={200}
              className="mx-auto mt-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateTodoPage;
