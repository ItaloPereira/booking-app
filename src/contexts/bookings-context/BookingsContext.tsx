import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { Booking } from '@/types/booking';
import type { Place } from '@/types/place';

import { places } from './data';

interface Snackbar {
  opened: boolean;
  message: string;
}

interface BookingsContextDataType {
  bookings: Booking[];
  places: Place[];
  snackbar: Snackbar;
}

interface BookingsContextValueType {
  bookings: Booking[];
  places: Place[];
  snackbar: Snackbar;
  createBooking: (newBooking: Booking) => void;
  deleteBooking: (bookingId: string) => void;
  editBooking: (editedBooking: Booking) => void;
  getPlaceById: (placeId: string) => Place | null;
  getBookingById: (bookingId: string) => Booking | null;
  openSnackbar: (message: string) => void;
  closeSnackbar: () => void;
}

export const BookingsContext = createContext<BookingsContextValueType | null>(null);

interface BookingsContextProviderProps {
  children?: ReactNode;
}

export const BookingsContextProvider = ({ children }: BookingsContextProviderProps) => {
  const localBookings = localStorage.getItem('bookings');
  const parsedLocalBookings = localBookings ? JSON.parse(localBookings) : [];

  const bookingsContextInitialState: BookingsContextDataType = {
    bookings: parsedLocalBookings,
    places,
    snackbar: {
      opened: false,
      message: '',
    }
  };

  const [bookingsState, setBookingsState] = useState<BookingsContextDataType>(bookingsContextInitialState);

  const createBooking = (newBooking: Booking) => {
    setBookingsState((prevState) => ({
      ...prevState,
      bookings: [...prevState.bookings, newBooking],
    }));

    localStorage.setItem('bookings', JSON.stringify([...bookingsState.bookings, newBooking]));
  };

  const deleteBooking = (bookingId: string) => {
    const newBookings = bookingsState.bookings.filter((booking) => booking.id !== bookingId);
    setBookingsState((prevState) => ({
      ...prevState,
      bookings: newBookings,
    }));

    localStorage.setItem('bookings', JSON.stringify(newBookings));
  };

  const editBooking = (editedBooking: Booking) => {
    const newBookings = bookingsState.bookings.map((booking) => {
      if (booking.id === editedBooking.id) {
        return editedBooking;
      }

      return booking;
    });

    setBookingsState((prevState) => ({
      ...prevState,
      bookings: newBookings,
    }));

    localStorage.setItem('bookings', JSON.stringify(newBookings));
  }

  const getPlaceById = (placeId: string) => {
    const place = bookingsState.places.find((place) => place.id === placeId);
    if (!place) {
      return null;
    }

    return place;
  }

  const getBookingById = (bookingId: string) => {
    const booking = bookingsState.bookings.find((booking) => booking.id === bookingId);
    if (!booking) {
      return null;
    }

    return booking;
  }

  const openSnackbar = (message: string) => {
    setBookingsState((prevState) => ({
      ...prevState,
      snackbar: {
        ...prevState.snackbar,
        opened: true,
        message,
      }
    }));
  }

  const closeSnackbar = () => {
    setBookingsState((prevState) => ({
      ...prevState,
      snackbar: {
        ...prevState.snackbar,
        opened: false,
      }
    }));
  }

  const value: BookingsContextValueType = {
    bookings: bookingsState.bookings,
    places: bookingsState.places,
    snackbar: bookingsState.snackbar,
    getPlaceById,
    getBookingById,
    createBooking,
    deleteBooking,
    editBooking,
    openSnackbar,
    closeSnackbar,
  };

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
};