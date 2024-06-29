import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import TopBar from './TopBar';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('TopBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo correctly', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>
    );

    expect(screen.getByText('Booking App')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('renders the Home link when not on the home page', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-page' });
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>
    );

    expect(screen.getAllByText('Home')).toHaveLength(2);
  });

  it('does not render the Home link when on the home page', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>
    );

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });
});