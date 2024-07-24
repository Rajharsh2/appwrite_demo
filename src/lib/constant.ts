import 'dotenv/config';

export const appwriteCredentials = {
  endpoint: process.env.NEXT_APPWRITE_ENDPOINT ?? '',
  projectId: process.env.NEXT_APPWRITE_TODO_PROJECT_ID ?? '',
  apiKey: process.env.NEXT_APPWRITE_API_KEY ?? '',
  cryptoKey: process.env.CRYPTO_SECRET_KEY ?? '',
  eventDatabaseId: process.env.APPWRITE_PROJECT_DATABASE_ID ?? '',
  demoDatabaseId: process.env.APPWRITE_DEMO_DATABASE_ID ?? '',
  todoCollectionId: process.env.APPWRITE_TODO_COLLECTION_ID ?? '',
  eventCollectionId: process.env.APPWRITE_EVENT_COLLECTION_ID ?? '',
  bankDetailCollectionId: process.env.APPWRITE_BANK_DETAIL_COLLECTION_ID ?? '',
  bankContactCollectionId:
    process.env.APPWRITE_BANK_CONTACT_COLLECTION_ID ?? '',
};
