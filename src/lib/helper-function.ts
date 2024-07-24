import {StatusCodes} from 'http-status-codes';
import {ServerActionErrorResponse} from './type';

export const errorWithProperMsg = (error: any): ServerActionErrorResponse => {
  if (error.code === 400) {
    // return {
    //   status: StatusCodes.BAD_REQUEST,
    //   message: 'Bad request. Please check your input and try again.',
    //   error: error,
    // };
    return {
      type: 'error',
      errors: 'Bad request. Please check your input and try again',
    };
  }
  if (error.code === 401) {
    if (error.type === 'user_invalid_credentials') {
      // return {
      //   status: StatusCodes.UNAUTHORIZED,
      //   message: 'Invalid credentials.',
      //   error: error,
      // };
      return {
        type: 'error',
        errors: 'Invalid credentials.',
      };
    }
    // return {
    //   status: StatusCodes.UNAUTHORIZED,
    //   message: 'Unauthorized access. Please log in and try again.',
    //   error: error,
    // };
    return {
      type: 'error',
      errors: 'Unauthorized access. Please log in and try again.',
    };
  }
  if (error.code === 403) {
    // return {
    //   status: StatusCodes.FORBIDDEN,
    //   message:
    //     'Forbidden access. You do not have permission to perform this action.',
    //   error: error,
    // };
    return {
      type: 'error',
      errors:
        'Forbidden access. You do not have permission to perform this action.',
    };
  }
  if (error.code === 404) {
    // return {
    //   status: StatusCodes.NOT_FOUND,
    //   message:
    //     'Resource not found. Please check the URL or resource identifier.',
    //   error: error,
    // };
    return {
      type: 'error',
      errors:
        'Resource not found. Please check the URL or resource identifier.',
    };
  }
  if (error.code === 429) {
    // return {
    //   status: StatusCodes.TOO_MANY_REQUESTS,
    //   message: 'Limit exceeded. Please try later.',
    //   error: error,
    // };
    return {
      type: 'error',
      errors: 'Limit exceeded. Please try later.',
    };
  }
  if (error.code === 503) {
    // return {
    //   status: StatusCodes.SERVICE_UNAVAILABLE,
    //   message: 'Service unavailable. Please try again later.',
    //   error: error,
    // };
    return {
      type: 'error',
      errors: 'Service unavailable. Please try again later.',
    };
  }

  // Default case for any other errors
  // return {
  //   status: StatusCodes.INTERNAL_SERVER_ERROR,
  //   message: 'Something went wrong. Please try again later.',
  //   error: error,
  // };
  return {
    type: 'error',
    errors: 'Something went wrong. Please try again later.',
  };
};
