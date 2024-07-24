import 'dotenv/config';
import {appwriteCredentials} from '@/lib/constant';
import {Client, Account, Databases, Avatars} from 'appwrite';

export const client = new Client();

client
  .setEndpoint(appwriteCredentials.endpoint)
  .setProject(appwriteCredentials.projectId);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const database = new Databases(client);
export {ID} from 'appwrite';
