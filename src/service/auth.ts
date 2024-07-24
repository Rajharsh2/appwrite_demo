import {account, ID} from '../appwrite/config';
import {errorWithProperMsg} from '@/lib/helper-function';
import {ServerActionResponse} from '@/lib/type';
import {Models} from 'appwrite';
import {PartialUsersFormData} from '@/types/user';

export const register = async (
  userData: any,
): Promise<ServerActionResponse<Models.User<Models.Preferences>>> => {
  try {
    const userAccount = await account.create(
      ID.unique(),
      userData.userEmail,
      userData.userPassword,
      userData.userName,
    );

    if (userData.userPhone) {
      const newUserData = await account.updatePhone(
        userAccount.$id,
        userData.userPhone,
      );

      console.log(newUserData);
    }

    const loggedUser = await account.createEmailPasswordSession(
      userData.userEmail,
      userData.userPassword,
    );
    console.log(loggedUser);

    console.log(userAccount);
    return {
      type: 'success',
      data: userAccount,
    };
  } catch (error) {
    // console.log(error);
    return errorWithProperMsg(error);
  }
};

export const login = async (
  userData: PartialUsersFormData,
): Promise<ServerActionResponse<Models.Session>> => {
  try {
    const user = await getCurrentUser();
    if (user.type === 'success') {
      await logoutUser();
    }

    const loggedUser = await account.createEmailPasswordSession(
      userData.userEmail,
      userData.userPassword,
    );

    return {
      type: 'success',
      data: loggedUser,
    };
  } catch (error) {
    console.log(error);
    return errorWithProperMsg(error);
  }
};

export const getCurrentUser = async (): Promise<
  ServerActionResponse<Models.User<Models.Preferences>>
> => {
  try {
    const loggedInUser = await account.get();
    console.log(loggedInUser);

    return {
      type: 'success',
      data: loggedInUser,
    };
  } catch (error) {
    return errorWithProperMsg(error);
  }
};

export const logoutUser = async (): Promise<ServerActionResponse<{}>> => {
  try {
    const loggedOut = await account.deleteSessions();
    console.log(loggedOut);
    return {
      type: 'success',
      data: loggedOut,
    };
  } catch (error) {
    // console.log(error);
    return errorWithProperMsg(error);
  }
};

export const getAllSessions = async () => {
  try {
    const sessions = await account.listSessions();
    console.log(sessions);
    return {
      type: 'success',
      data: sessions,
    };
  } catch (error) {
    return errorWithProperMsg(error);
  }
};
