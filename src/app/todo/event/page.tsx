'use client';
import {createEvents, getAllBankDetails, getAllEvents} from '@/service/event';
import {Models} from 'appwrite';
import React, {useState} from 'react';
import {toast} from 'sonner';
import EventComponent from '@/components/Events';

const TodoEventPage = () => {
  const [events, setEvents] = useState<Models.Document[]>([]);

  const handleButton1 = async () => {
    const events = await getAllEvents();
    if (events.type === 'error') {
      toast.error('Failed to fetch events');
      return;
    }
    setEvents(events.data.documents);
  };
  const handleButton2 = async () => {
    const bankDetails = await getAllBankDetails();
    if (bankDetails.type === 'error') {
      toast.error('Failed to fetch bank details');
      return;
    }

    const newEvent = await createEvents(
      {
        name: 'Evetn 4',
        description: 'Event description 4',
        venue: 'Venue 4',
        date: new Date().toISOString(), // ISO 8601 format for datetime
        entryFee: 0,
        categories: 'acting',
      },
      bankDetails.data.documents[1]['$id'],
    );

    if (newEvent.type === 'error') {
      toast.error(newEvent.errors);
      return;
    }

    console.log(newEvent.data);
  };
  return (
    <div className="w-full text-center mx-auto mt-20">
      <button
        className="h-10 w-40 m-8 py-2 bg-blue-400 rounded-md text-base font-bold"
        type="button"
        onClick={handleButton1}
      >
        Button1
      </button>
      <button
        className="h-10 w-40 m-8 py-2 bg-blue-400 rounded-md text-base font-bold"
        type="button"
        onClick={handleButton2}
      >
        Button2
      </button>
      {events.map((event: Models.Document, index: number) => (
        <EventComponent
          event={event}
          key={index}
          onSubmit={() => console.log('btn clicked')}
        />
      ))}
    </div>
  );
};

export default TodoEventPage;
