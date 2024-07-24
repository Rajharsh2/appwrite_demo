'use client';

import {toast} from 'sonner';
import DOMPurify from 'dompurify';
import React, {useState} from 'react';
import {register} from '@/service/auth';
import {redirect} from 'next/navigation';
import {userValidationSchema} from '@/types/user';
import RegisterForm from '@/components/RegisterForm';

const RegisterUser = () => {
  const [error, setError] = useState<Record<string, string[]>>({});

  const registration = async (formData: FormData) => {
    const {userName, userEmail, userPassword} = Object.fromEntries(formData);

    const sanitizedData = {
      userName: DOMPurify.sanitize(userName as string),
      userEmail: DOMPurify.sanitize(userEmail as string),
      userPassword: DOMPurify.sanitize(userPassword as string),
    };

    const parsedResult = userValidationSchema.safeParse(sanitizedData);

    if (!parsedResult.success) {
      setError(parsedResult.error.flatten().fieldErrors);
      return;
    } else {
      setError({});
    }

    const response = await register(parsedResult.data);

    if (response.type === 'error') {
      toast.error(response.errors);
      return;
    }

    toast.success('Registration successfull');
    redirect('/todo');

    // if (registrationRessponse?.status === StatusCodes.CONFLICT) {
    //   toast.warning(registrationRessponse.message);
    //   return;
    // }

    // if (registrationRessponse?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
    //   toast.error(registrationRessponse.message);
    //   return;
    // }
    // if (registrationRessponse?.status === StatusCodes.CREATED) {
    //   toast.success(registrationRessponse.message);
    //   redirect('/login');
    // }
  };

  return <RegisterForm onSubmit={registration} error={error} />;
};

export default RegisterUser;
