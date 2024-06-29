import { render, screen, fireEvent } from '@testing-library/react';
import Snackbar from './Snackbar';
import { useBookingsContext } from '@/contexts/bookings-context/useBookingsContext';

jest.mock('@/contexts/bookings-context/useBookingsContext', () => ({
  useBookingsContext: jest.fn(),
}));

const mockCloseSnackbar = jest.fn();

(useBookingsContext as jest.Mock).mockReturnValue({
  snackbar: {
    opened: true,
    message: 'Test message',
  },
  closeSnackbar: mockCloseSnackbar,
});

describe('Snackbar', () => {
  it('renders the snackbar with the correct message', () => {
    render(<Snackbar />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('calls closeSnackbar when the alert is closed', () => {
    render(<Snackbar />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockCloseSnackbar).toHaveBeenCalled();
  });
});