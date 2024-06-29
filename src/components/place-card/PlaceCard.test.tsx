import { render, screen } from '@testing-library/react';
import PlaceCard from './PlaceCard';
import type { Place } from '@/types/place';

const mockPlace: Place = {
  id: '1',
  title: 'Test Place',
  image: 'test-image.jpg',
  description: 'A great place to stay',
  nightPrice: 100,
};


describe('PlaceCard', () => {
  it('renders the place card correctly', () => {
    render(<PlaceCard place={mockPlace} />);

    const cardLink = screen.getByRole('link');
    expect(cardLink).toHaveAttribute('href', `/place/${mockPlace.id}`);

    const cardMedia = cardLink.querySelector('.MuiCardMedia-root');
    expect(cardMedia).toHaveStyle(`background-image: url(${mockPlace.image})`);

    expect(screen.getByText(mockPlace.title)).toBeInTheDocument();
    expect(screen.getByText(mockPlace.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockPlace.nightPrice} USD`)).toBeInTheDocument();
    expect(screen.getByText('/night')).toBeInTheDocument();
  });
});