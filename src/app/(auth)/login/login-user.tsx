'use client';

import React, {useState} from 'react';
import {toast} from 'sonner';
import DOMPurify from 'dompurify';
import {redirect} from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import {createPhoneLoginSession, login, loginByPhone} from '@/service/auth';
import LoginPhoneForm from '@/components/LoginByPhone';

const LoginUser = () => {
  const [userDetail, setUserDetail] = useState<any>({});

  const handleOtp = async (phone: string) => {
    console.log(phone);
    const response = await loginByPhone(phone);

    if (response.type === 'error') {
      toast.error(response.errors);
      return;
    }
    toast.success('Please check your phone. Verify to login');
    setUserDetail({
      userId: response.data.userId,
    });
  };

  const loginUser = async (formData: FormData) => {
    const {phone, token} = Object.fromEntries(formData);
    const sanitizedData = {
      phone: DOMPurify.sanitize(phone as string),
      token: DOMPurify.sanitize(token as string),
    };

    const response = await createPhoneLoginSession(
      userDetail.userId,
      sanitizedData.token,
    );

    if (response.type === 'error') {
      toast.error(response.errors);
      return;
    }

    toast.success('Use loggedin successfully');
    redirect('/todo');
  };

  return <LoginPhoneForm handleOtp={handleOtp} onSubmit={loginUser} />;
};

// const LoginUser = () => {
//   const loginUser = async (formData: FormData) => {
//     const {userEmail, userPassword} = Object.fromEntries(formData);
//     const sanitizedData = {
//       userEmail: DOMPurify.sanitize(userEmail as string),
//       userPassword: DOMPurify.sanitize(userPassword as string),
//     };

//     const response = await login(sanitizedData);

//     if (response.type === 'error') {
//       toast.error(response.errors);
//       return;
//     }

//     toast.success('Use loggedin successfully');
//     redirect('/todo');
//   };

//   return <LoginForm onSubmit={loginUser} />;
// };

export default LoginUser;
