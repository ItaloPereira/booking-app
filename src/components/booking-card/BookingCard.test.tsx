import { render, screen, fireEvent } from '@testing-library/react';
import BookingCard from './BookingCard';
import { formatDate } from '@/helpers/date';
import type { Booking } from '@/types/booking';
import type { Place } from '@/types/place';

const mockBooking: Booking = {
  id: '1',
  checkin: '2024-07-01',
  checkout: '2024-07-05',
  placeId: '1',
};

const mockPlace: Place = {
  id: '1',
  title: 'Test Place',
  image: 'test-image.jpg',
  description: 'A great place to stay',
  nightPrice: 100,
};

const mockOnDelete = jest.fn();

describe('BookingCard', () => {
  it('renders booking details correctly', () => {
    render(<BookingCard booking={mockBooking} place={mockPlace} onDelete={mockOnDelete} />);
    
    const dateElement = screen.getByText(`${formatDate(mockBooking.checkin)} - ${formatDate(mockBooking.checkout)}`);
    const titleElement = screen.getByText(mockPlace.title);
    const priceElement = screen.getByText(`$400 USD for 4 night(s)`);
    
    expect(dateElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  it('calls onDelete when Delete Booking button is clicked', () => {
    render(<BookingCard booking={mockBooking} place={mockPlace} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByText(/Delete Booking/i);
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockBooking.id);
  });
});