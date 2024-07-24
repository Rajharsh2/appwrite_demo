import crypto from 'crypto';
import {avatars} from '../appwrite/config';
import {appwriteCredentials} from '@/lib/constant';

export const generateSignature = (data: any) => {
  const signature = crypto
    .createHmac('sha256', appwriteCredentials.cryptoKey)
    .update(JSON.stringify(data))
    .digest('hex');

  console.log(signature);

  return signature;
};

export const validateSignature = async (data: any, signature: string) => {
  const calculatedSignature = crypto
    .createHmac('sha256', appwriteCredentials.cryptoKey)
    .update(JSON.stringify(data))
    .digest('hex');
  return calculatedSignature === signature;
};

export const createEventQr = async (
  ticketId: string,
  userId: string,
  eventId: string,
) => {
  try {
    const data = {
      ticketId,
      userId,
      eventId,
      timestamp: Date.now(),
    };
    const signature = generateSignature(data);
    const qrData = {...data, signature};

    const qrCode = await avatars.getQR(JSON.stringify(qrData), 400, 1, true);
    console.log(qrCode);
    return qrCode;
  } catch (error) {
    console.log(error);
  }
};

export const createQr = async () => {
  try {
    const result = await avatars.getQR(
      'https://in.linkedin.com/in/rajharsh2',
      400,
      1,
      true,
    );
    console.log('QR Code:', result);
    console.log(result.href);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const scanQrCode = async (qrData: any) => {
  try {
    const data = JSON.parse(qrData);
    const {ticketId, userId, eventId, timestamp, signature} = data;

    const isQrValid = validateSignature(
      {ticketId, userId, eventId, timestamp},
      signature,
    );

    if (!isQrValid) {
      throw new Error('Invalid QR Code');
    }

    /// apply logic to fetch the ticket and cross check the userId, eventId,
    /// if valid then update ticket attribute `used` true

    return 'Ticket is valid';
  } catch (error) {
    console.log(error);
    return error;
  }
};
