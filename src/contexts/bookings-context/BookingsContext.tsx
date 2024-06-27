import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { Booking } from '@/types/booking';
import type { Place } from '@/types/place';

import { places } from './data';

interface BookingsContextDataType {
  bookings: Booking[];
  places: Place[];
}

interface BookingsContextValueType {
  bookings: Booking[];
  places: Place[];
  createBooking: (newBooking: Booking) => void;
}

export const BookingsContext = createContext<BookingsContextValueType | null>(null);

interface BookingsContextProviderProps {
  children?: ReactNode;
}

export const BookingsContextProvider = ({ children }: BookingsContextProviderProps) => {
  const bookingsContextInitialState: BookingsContextDataType = {
    bookings: [],
    places,
  };

  const [bookingsState, setBookingsState] = useState<BookingsContextDataType>(bookingsContextInitialState);

  const createBooking = (newBooking: Booking) => {
    setBookingsState((prevState) => ({
      ...prevState,
      bookings: [...prevState.bookings, newBooking],
    }));
  };

  const value: BookingsContextValueType = {
    bookings: bookingsState.bookings,
    places: bookingsState.places,
    createBooking,
  };

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
};