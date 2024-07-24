import Image from 'next/image';
import {Models} from 'appwrite';
import React from 'react';
import profilepic from '../assets/profilepic.jpg';
import Button from './Button';

const EventComponent = ({
  event,
  onSubmit,
}: {
  event: Models.Document;
  onSubmit: () => void;
}) => {
  return (
    <div className="border border-gray-300 p-6 max-w-lg mx-auto my-6 rounded-lg shadow-md">
      <div className="flex gap-2">
        <div className="w-2/3 pl-4 border-l border-gray-200 flex flex-col items-start text-left text-base">
          {' '}
          {/* Align content to the right */}
          <h2 className="text-lg font-bold mb-2 ">{event.name}</h2>
          <p className="mb-2 text-base">
            <strong>Description:</strong> {event.description}
          </p>
          <div className="mt-3">
            <h3 className="text-base font-bold mb-2">Bank Details</h3>
            <div className="ml-4">
              <p className="mb-2 text-base">
                <strong>Account Holder Name:</strong> {event.bankDetails.name}
              </p>
              <p className="mb-2 text-base">
                <strong>Account Number:</strong> {event.bankDetails.account_no}
              </p>
              <p className="mb-2 text-base">
                <strong>IFSC Code:</strong> {event.bankDetails.ifsc_code}
              </p>
              <div className="mt-2">
                <h4 className="text-base font-medium mb-1">Bank Contact</h4>
                <div className="ml-4">
                  <p className="mb-2 text-base">
                    <strong>Bank Name:</strong>{' '}
                    {event.bankDetails.bankContact.name}
                  </p>
                  <p className="mb-2 text-base">
                    <strong>Bank Address:</strong>{' '}
                    {event.bankDetails.bankContact.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 pr-4 mt-6 bg-opacity-90 opacity-90 rounded-2xl h-fit p-2 border-gray-600 text-sm font-semibold shadow-2xl">
          <Image
            src={profilepic}
            alt="Event"
            className="ml-1 rounded-lg mb-4"
            height={500}
            width={500}
          />
          <div className="text-left ml-1">
            <p>
              <strong className="text-sm font-bold">Venue:</strong>{' '}
              {event.venue}
            </p>
            {event.entryFee !== 0 ? (
              <p>
                <strong className="text-sm font-bold">Entry Fee:</strong>{' '}
                {event.entryFee}
              </p>
            ) : (
              <p>
                <strong className="text-sm font-bold">Entry Fee:</strong> Free
              </p>
            )}
            <p>
              <strong className="text-sm font-bold">Category:</strong>{' '}
              {event.categories}
            </p>
            <p>
              <strong className="text-sm font-bold">Date:</strong>{' '}
              {new Date(event.date).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </p>
          </div>

          <Button
            type="submit"
            className="w-4/5 text-center text-white text-base font-semibold rounded-lg pt-1 pb-[0.32rem] mt-4 mb-2 mx-auto bg-green-800"
            handleClick={onSubmit}
          >
            Participate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
