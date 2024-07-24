import {errorWithProperMsg} from '@/lib/helper-function';
import {database, ID} from '../appwrite/config';
import {ServerActionResponse} from '@/lib/type';
import {Models} from 'appwrite';
import {appwriteCredentials} from '@/lib/constant';

export const createBankContact = async (contactData: {
  name: string;
  address: string;
}): Promise<ServerActionResponse<Models.Document>> => {
  try {
    const createdBankContact = await database.createDocument(
      appwriteCredentials.eventDatabaseId,
      appwriteCredentials.bankContactCollectionId,
      ID.unique(),
      {
        ...contactData,
      },
    );
    return {
      type: 'success',
      data: createdBankContact,
    };
  } catch (error) {
    return errorWithProperMsg(error);
  }
};

export const createBankDetails = async (
  bankDetialData: any,
  bankContactId: string,
): Promise<ServerActionResponse<Models.Document>> => {
  try {
    const createdBankDetail = await database.createDocument(
      appwriteCredentials.eventDatabaseId,
      appwriteCredentials.bankDetailCollectionId,
      ID.unique(),
      {
        name: bankDetialData.name,
        account_no: bankDetialData.account_no,
        ifsc_code: bankDetialData.ifsc_code,
        bankContact: bankContactId,
      },
    );
    return {
      type: 'success',
      data: createdBankDetail,
    };
  } catch (error) {
    return errorWithProperMsg(error);
  }
};

export const getAllBankDetails = async (): Promise<
  ServerActionResponse<Models.DocumentList<Models.Document>>
> => {
  try {
    const banks = await database.listDocuments(
      appwriteCredentials.eventDatabaseId,
      appwriteCredentials.bankDetailCollectionId,
    );

    return {
      type: 'success',
      data: banks,
    };
  } catch (error) {
    return errorWithProperMsg(error);
  }
};

export const createEvents = async (
  eventData: any,
  bankDetialId: string,
): Promise<ServerActionResponse<Models.Document>> => {
  try {
    const createdEvent = await database.createDocument(
      appwriteCredentials.eventDatabaseId,
      appwriteCredentials.eventCollectionId,
      ID.unique(),
      {
        name: eventData.name,
        description: eventData.description,
        venue: eventData.venue,
        date: new Date().toISOString(),
        entryFee: eventData.entryFee,
        categories: eventData.categories,
        bankDetails: bankDetialId,
      },
    );
    return {
      type: 'success',
      data: createdEvent,
    };
  } catch (error) {
    console.log(error);
    return errorWithProperMsg(error);
  }
};

export const getAllEvents = async (): Promise<
  ServerActionResponse<Models.DocumentList<Models.Document>>
> => {
  try {
    const events = await database.listDocuments(
      appwriteCredentials.eventDatabaseId,
      appwriteCredentials.eventCollectionId,
    );

    console.log(events);
    return {
      type: 'success',
      data: events,
    };
  } catch (error) {
    console.log(error);
    return errorWithProperMsg(error);
  }
};

export const getEventById = async (eventId: string) => {
  try {
    const event = await database.getDocument(
      appwriteCredentials.eventDatabaseId,
      appwriteCredentials.eventCollectionId,
      eventId,
    );
    return {
      type: 'success',
      data: event,
    };
  } catch (error) {
    return errorWithProperMsg(error);
  }
};

export const updateEvent = async (eventId: string, eventData: any) => {
  try {
    const updatedEvent = await database.updateDocument(
      appwriteCredentials.eventDatabaseId,
      appwriteCredentials.eventCollectionId,
      eventId,
      {...eventData},
    );

    return {
      type: 'success',
      data: updatedEvent,
    };
  } catch (error) {
    return errorWithProperMsg(error);
  }
};

export const deleteEvent = async (
  eventId: string,
): Promise<ServerActionResponse<{}>> => {
  try {
    const deletedTodo = await database.deleteDocument(
      appwriteCredentials.eventDatabaseId,
      appwriteCredentials.eventCollectionId,
      eventId,
    );

    return {
      type: 'success',
      data: deletedTodo,
    };
  } catch (error) {
    return errorWithProperMsg(error);
  }
};
