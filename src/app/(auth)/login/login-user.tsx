'use client';

import React from 'react';
import {toast} from 'sonner';
import DOMPurify from 'dompurify';
import {redirect} from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import {login} from '@/service/auth';

const LoginUser = () => {
  const loginUser = async (formData: FormData) => {
    const {userEmail, userPassword} = Object.fromEntries(formData);
    const sanitizedData = {
      userEmail: DOMPurify.sanitize(userEmail as string),
      userPassword: DOMPurify.sanitize(userPassword as string),
    };

    const response = await login(sanitizedData);

    if (response.type === 'error') {
      toast.error(response.errors);
      return;
    }

    toast.success('Use loggedin successfully');
    redirect('/todo');

    // if (response?.status === StatusCodes.OK) {
    //   toast.success('Logged in Successfully');
    //   redirect('/todo');
    // } else if (response?.status === StatusCodes.BAD_REQUEST) {
    //   toast.warning(response.message);
    // } else if (response?.status === StatusCodes.UNAUTHORIZED) {
    //   toast.error(response.message);
    // } else if (response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
    //   toast.error(response.message);
    //   return;
    // } else {
    //   toast.error(response.message);
    //   return;
    // }
  };

  return <LoginForm onSubmit={loginUser} />;
};

export default LoginUser;
