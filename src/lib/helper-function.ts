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
      // errors: 'Bad request. Please check your input and try again',
      errors: error.response.message,
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
        // errors: 'Invalid credentials.',
        errors: error.response.message,
      };
    }
    // return {
    //   status: StatusCodes.UNAUTHORIZED,
    //   message: 'Unauthorized access. Please log in and try again.',
    //   error: error,
    // };
    return {
      type: 'error',
      // errors: 'Unauthorized access. Please log in and try again.',
      errors: error.response.message,
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
      // errors:
      //   'Forbidden access. You do not have permission to perform this action.',
      errors: error.response.message,
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
      // errors:
      //   'Resource not found. Please check the URL or resource identifier.',
      errors: error.response.message,
    };
  }
  if (error.code === 409) {
    // return {
    //   status: StatusCodes.NOT_FOUND,
    //   message:
    //     'Resource not found. Please check the URL or resource identifier.',
    //   error: error,
    // };
    return {
      type: 'error',
      errors: error.response.message,
    };
  }
  if (error.code === 429) {
    return {
      type: 'error',
      // errors: 'Limit exceeded. Please try later.',
      errors: error.response.message,
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
      // errors: 'Service unavailable. Please try again later.',
      errors: error.response.message,
    };
  }

  return {
    type: 'error',
    errors: 'Something went wrong. Please try again later.',
  };
};
