import 'dotenv/config';

const accountSid = process.env.TWILIO_SID ?? '';
const authToken = process.env.TWILIO_AUTH_TOKEN ?? '';
const client = require('twilio')(accountSid, authToken);

export const sendWhatsAppMsg = (loggedUser: any) => {
  try {
    const message = client.messages.create({
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+9199999999', // Recipient's WhatsApp number
      // body: `Hello ${loggedUser.name}, you have successfully logged in!`,
      body: `Hello Raj, you have successfully logged in!`,
    });
    console.log('Message sent with SID:', message.sid);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};
