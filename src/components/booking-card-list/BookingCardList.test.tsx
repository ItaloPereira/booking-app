import { render, screen, fireEvent } from '@testing-library/react';
import BookingCardList from './BookingCardList';
import { useBookingsContext } from '@/contexts/bookings-context/useBookingsContext';
import type { Booking } from '@/types/booking';

jest.mock('@/contexts/bookings-context/useBookingsContext');

const mockGetPlaceById = jest.fn();
const mockDeleteBooking = jest.fn();
const mockOpenSnackbar = jest.fn();

(useBookingsContext as jest.Mock).mockReturnValue({
  getPlaceById: mockGetPlaceById,
  deleteBooking: mockDeleteBooking,
  openSnackbar: mockOpenSnackbar,
});

const mockBookings: Booking[] = [
  { id: '1', checkin: '2024-07-01', checkout: '2024-07-05', placeId: '1' },
  { id: '2', checkin: '2024-07-10', checkout: '2024-07-15', placeId: '2' },
];

const mockPlace1 = {
  id: '1',
  image: 'place1.jpg',
  title: 'Place 1',
  description: 'Description 1',
  nightPrice: 100,
};

const mockPlace2 = {
  id: '2',
  image: 'place2.jpg',
  title: 'Place 2',
  description: 'Description 2',
  nightPrice: 150,
};

describe('BookingCardList', () => {
  beforeEach(() => {
    mockGetPlaceById.mockImplementation((id) => {
      if (id === '1') return mockPlace1;
      if (id === '2') return mockPlace2;
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders no upcoming bookings message when there are no future bookings', () => {
    render(<BookingCardList bookings={[]} />);

    expect(screen.getByText(/No upcoming bookings/i)).toBeInTheDocument();
    expect(screen.getByText(/Start browsing the sea of possibilities/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Now/i })).toBeInTheDocument();
  });

  it('renders booking cards for future bookings', () => {
    render(<BookingCardList bookings={mockBookings} />);

    expect(screen.getByText(/Place 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Place 2/i)).toBeInTheDocument();
  });

  it('calls deleteBooking and openSnackbar when a booking is deleted', () => {
    render(<BookingCardList bookings={mockBookings} />);

    const deleteButton = screen.getAllByText(/Delete Booking/i)[0];
    fireEvent.click(deleteButton);

    expect(mockDeleteBooking).toHaveBeenCalledWith('1');
    expect(mockOpenSnackbar).toHaveBeenCalledWith('Booking successfully deleted.');
  });
});