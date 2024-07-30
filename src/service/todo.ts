import {Models, Query} from 'appwrite';
import {account, avatars, database, ID} from '../appwrite/config';
import {serverDatabase} from '../appwrite/server-config';
import {getCurrentUser} from './auth';
import {errorWithProperMsg} from '@/lib/helper-function';
import {ServerActionResponse} from '@/lib/type';
import {appwriteCredentials} from '@/lib/constant';

export const AddAttribute = async () => {
  try {
    const result = await serverDatabase.createStringAttribute(
      appwriteCredentials.demoDatabaseId,
      appwriteCredentials.todoCollectionId,
      'motive', // key
      250, // size
      false, // required
      '', // default (optional)
      false, // array (optional)
      false, // encrypt (optional)
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error in AddAttribute:', error);
    throw error;
  }
};

export const createTodo = async (
  todoData: any,
): Promise<ServerActionResponse<Models.Document>> => {
  try {
    const userData = await account.get();
    const createdTodo = await database.createDocument(
      appwriteCredentials.demoDatabaseId,
      appwriteCredentials.todoCollectionId,
      ID.unique(),
      {
        title: todoData.title,
        description: todoData.description,
        status: todoData.status,
        userId: userData.$id,
        qrcode: todoData.qrcode,
      },
    );
    console.log('from todo: ', createdTodo);
    return {
      type: 'success',
      data: createdTodo,
    };
  } catch (error) {
    console.error('Error in createTodo:', error);
    return errorWithProperMsg(error);
  }
};

export const updateTodo = async (
  todoId: string,
  todoData: any,
): Promise<ServerActionResponse<Models.Document>> => {
  try {
    const updateData = {
      ...todoData,
      status: 'Pending',
    };
    const updatedTodo = await database.updateDocument(
      appwriteCredentials.demoDatabaseId,
      appwriteCredentials.todoCollectionId,
      todoId,
      updateData,
    );
    console.log(updatedTodo);
    return {
      type: 'success',
      data: updatedTodo,
    };
  } catch (error) {
    console.log(error);
    return errorWithProperMsg(error);
  }
};

export const getTodoById = async (
  todoId: string,
): Promise<ServerActionResponse<Models.Document>> => {
  try {
    const todo = await database.getDocument(
      appwriteCredentials.demoDatabaseId,
      appwriteCredentials.todoCollectionId,
      todoId,
    );
    return {
      type: 'success',
      data: todo,
    };
  } catch (error) {
    console.log(error);
    return errorWithProperMsg(error);
  }
};

export const getAllTodos = async (): Promise<
  ServerActionResponse<Models.DocumentList<Models.Document>>
> => {
  try {
    const user = await getCurrentUser();

    const todos = await database.listDocuments(
      appwriteCredentials.demoDatabaseId,
      appwriteCredentials.todoCollectionId,
      [
        Query.equal('userId', user.type === 'success' ? user.data['$id'] : ''),
        // Query.search('title', 'app'),
      ],
    );
    console.log(todos);
    return {
      type: 'success',
      data: todos,
    };
  } catch (error) {
    console.log(error);
    return errorWithProperMsg(error);
  }
};

export const getCompletedTodos = async (): Promise<
  ServerActionResponse<Models.DocumentList<Models.Document>>
> => {
  try {
    const user = await getCurrentUser();

    const todos = await database.listDocuments(
      appwriteCredentials.demoDatabaseId,
      appwriteCredentials.todoCollectionId,
      [
        Query.equal('userId', user.type === 'success' ? user.data['$id'] : ''),
        Query.equal('status', ['Completed']),
      ],
    );
    console.log(todos);
    return {
      type: 'success',
      data: todos,
    };
  } catch (error) {
    return errorWithProperMsg(error);
  }
};
export const getPendingTodos = async (): Promise<
  ServerActionResponse<Models.DocumentList<Models.Document>>
> => {
  try {
    const user = await getCurrentUser();

    const todos = await database.listDocuments(
      appwriteCredentials.demoDatabaseId,
      appwriteCredentials.todoCollectionId,
      [
        Query.equal('userId', user.type === 'success' ? user.data['$id'] : ''),
        Query.equal('status', ['Pending']),
      ],
    );
    console.log(todos);
    return {
      type: 'success',
      data: todos,
    };
  } catch (error) {
    return errorWithProperMsg(error);
  }
};

export const deleteTodo = async (
  todoId: string,
): Promise<ServerActionResponse<{}>> => {
  try {
    const deletedTodo = await database.deleteDocument(
      appwriteCredentials.demoDatabaseId,
      appwriteCredentials.todoCollectionId,
      todoId,
    );
    return {
      type: 'success',
      data: deletedTodo,
    };
  } catch (error) {
    console.log(error);
    return errorWithProperMsg(error);
  }
};
