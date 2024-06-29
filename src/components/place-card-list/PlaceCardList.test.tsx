import { render, screen } from '@testing-library/react';
import PlaceCardList from './PlaceCardList';
import type { Place } from '@/types/place';

const mockPlaces: Place[] = [
  {
    id: '1',
    title: 'Place One',
    image: 'image-one.jpg',
    description: 'Description for Place One',
    nightPrice: 100,
  },
  {
    id: '2',
    title: 'Place Two',
    image: 'image-two.jpg',
    description: 'Description for Place Two',
    nightPrice: 150,
  },
  {
    id: '3',
    title: 'Place Three',
    image: 'image-three.jpg',
    description: 'Description for Place Three',
    nightPrice: 200,
  },
];

describe('PlaceCardList', () => {
  it('renders a list of place cards correctly', () => {
    render(<PlaceCardList places={mockPlaces} />);

    mockPlaces.forEach((place) => {
      expect(screen.getByText(place.title)).toBeInTheDocument();
      expect(screen.getByText(place.description)).toBeInTheDocument();
      expect(screen.getByText(`$${place.nightPrice} USD`)).toBeInTheDocument();
    });
  });

  it('renders the correct number of place cards', () => {
    render(<PlaceCardList places={mockPlaces} />);
    
    const placeCards = screen.getAllByRole('link');
    expect(placeCards).toHaveLength(mockPlaces.length);
  });
});