import { useContext } from 'react';
import { BookingsContext } from './BookingsContext';

export const useBookingsContext = () => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookingsContext must be used within a BookingsContextProvider');
  }
  return context;
};