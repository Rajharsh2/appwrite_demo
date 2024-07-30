'use client';
import React, {useState} from 'react';
import Button from './Button';
import TextField from './TextField';

interface loginUserFormProps {
  handleOtp: (phone: string) => Promise<void>;
  onSubmit: (formData: FormData) => Promise<void>;
  error?: Record<string, string[]>;
}

const LoginPhoneForm = (props: loginUserFormProps) => {
  const {handleOtp, onSubmit, error} = props;
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(true);
  const [phone, setPhone] = useState('');

  const handleOtpClick = async () => {
    await handleOtp(phone);
    setOtpSent(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('token', otp);
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full mb-3">
        <TextField
          className="w-full mb-3"
          type="text"
          name="phone"
          label="Mobile No."
          placeholder="Enter your phone number"
          required
          error={error?.phone?.[0] || ''}
          onChange={(e) => setPhone(e.target.value)}
        />

        {otpSent && (
          <TextField
            className="w-full mb-2"
            type="text"
            name="token"
            label="Verify Otp"
            placeholder="Enter your OTP"
            required
            error={error?.token?.[0] || ''}
            isOtp={true}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}
      </div>

      {!otpSent && (
        <Button
          className="btm-auth-btn"
          type="button"
          handleClick={handleOtpClick}
        >
          Send Otp
        </Button>
      )}

      {otpSent && (
        <Button className="btm-auth-btn" type="submit">
          Login
        </Button>
      )}
    </form>
  );
};

export default LoginPhoneForm;
