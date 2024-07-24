'use server';

import {Client, Account} from 'node-appwrite';
import sdk from 'node-appwrite';
import {cookies} from 'next/headers';
import {appwriteCredentials} from '@/lib/constant';

const serverClient = new sdk.Client()
  .setEndpoint(appwriteCredentials.endpoint)
  .setProject(appwriteCredentials.projectId)
  .setKey(appwriteCredentials.apiKey); // Your secret API key

export const serverDatabase = new sdk.Databases(serverClient);
export const serverAvatar = new sdk.Avatars(serverClient);
