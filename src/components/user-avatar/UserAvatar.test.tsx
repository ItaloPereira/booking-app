import { render, screen, fireEvent } from '@testing-library/react';
import UserAvatar from './UserAvatar';
import { MemoryRouter } from 'react-router-dom';

describe('UserAvatar', () => {
  it('renders the avatar with badge', () => {
    render(
      <MemoryRouter>
        <UserAvatar />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('account of current user')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens and closes the menu when avatar is clicked', () => {
    render(
      <MemoryRouter>
        <UserAvatar />
      </MemoryRouter>
    );

    const avatarButton = screen.getByLabelText('account of current user');
    fireEvent.click(avatarButton);

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('FirstName LastName')).toBeInTheDocument();
    expect(screen.getByText('user@bookingapp.com')).toBeInTheDocument();

    const closeMenuButton = screen.getByRole('menu');
    fireEvent.click(closeMenuButton);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('renders the menu items correctly', () => {
    render(
      <MemoryRouter>
        <UserAvatar />
      </MemoryRouter>
    );

    const avatarButton = screen.getByLabelText('account of current user');
    fireEvent.click(avatarButton);

    expect(screen.getByText('My Bookings')).toBeInTheDocument();
  });

  it('navigates to the correct link when a menu item is clicked', () => {
    render(
      <MemoryRouter>
        <UserAvatar />
      </MemoryRouter>
    );

    const avatarButton = screen.getByLabelText('account of current user');
    fireEvent.click(avatarButton);

    const myBookingsLink = screen.getByText('My Bookings');
    expect(myBookingsLink).toHaveAttribute('href', '/my-bookings');
  });
});