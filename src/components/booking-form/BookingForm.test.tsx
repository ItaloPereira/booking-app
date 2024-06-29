import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import BookingForm from './BookingForm';
import { useBookingsContext } from '@/contexts/bookings-context/useBookingsContext';

import type { Booking } from '@/types/booking';
import type { Place } from '@/types/place';
import AppProviders from '@/AppProviders';

jest.mock('@/contexts/bookings-context/useBookingsContext', () => ({
  useBookingsContext: jest.fn(),
}));

const mockBooking: Booking = {
  id: '1',
  checkin: '2024-07-02T00:00:00.000Z',
  checkout: '2024-07-06T00:00:00.000Z',
  placeId: '1',
};

const mockPlace: Place = {
  id: '1',
  title: 'Test Place',
  image: 'test-image.jpg',
  description: 'A great place to stay',
  nightPrice: 100,
};

const mockCreateBooking = jest.fn();
const mockEditBooking = jest.fn();
const mockOpenSnackbar = jest.fn();
const mockUseNavigate = jest.fn();

(useBookingsContext as jest.Mock).mockReturnValue({
  createBooking: mockCreateBooking,
  editBooking: mockEditBooking,
  bookings: [],
  openSnackbar: mockOpenSnackbar,
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockUseNavigate,
}));

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <AppProviders>
      {component}
    </AppProviders>
  );
};

describe('BookingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the booking form correctly', () => {
    renderWithProviders(
      <BookingForm place={mockPlace} booking={null} />
    );

    expect(screen.getByRole('form', { name: /Booking Form/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/CHECK-IN/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CHECKOUT/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Book now/i })).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    const { container } = renderWithProviders(
      <BookingForm place={mockPlace} booking={null} />
    );

    const checkinInput = container.querySelector('input[name="checkin"]');
    const checkoutInput = container.querySelector('input[name="checkout"]');
    const submitButton = screen.getByRole('button', { name: /Book now/i });

    if (checkinInput && checkoutInput) {
      await userEvent.type(checkinInput, '07/02/2025');
      await userEvent.type(checkoutInput, '07/06/2025');

      fireEvent.click(submitButton);

      expect(mockCreateBooking).toHaveBeenCalled();
      expect(mockOpenSnackbar).toHaveBeenCalledWith('Your booking has been successfully completed!');
      expect(mockUseNavigate).toHaveBeenCalledWith('/my-bookings');
    } else {
      throw new Error('Input elements not found');
    }
  });

  it('handles booking editing correctly', async () => {
    const { container } = renderWithProviders(
      <BookingForm place={mockPlace} booking={mockBooking} />
    );

    const checkinInput = container.querySelector('input[name="checkin"]');
    const checkoutInput = container.querySelector('input[name="checkout"]');
    const submitButton = screen.getByRole('button', { name: /Edit Booking/i });

    if (checkinInput && checkoutInput) {

      await userEvent.type(checkinInput, '07/02/2025');
      await userEvent.type(checkoutInput, '07/06/2025');

      fireEvent.click(submitButton);

      expect(mockEditBooking).toHaveBeenCalled();
      expect(mockOpenSnackbar).toHaveBeenCalledWith('Your booking has been successfully updated!');
      expect(mockUseNavigate).toHaveBeenCalledWith('/my-bookings');
    } else {
      throw new Error('Input elements not found');
    }
  });
});