import { render, screen } from '@testing-library/react';
import PageHeader from './PageHeader';
import AppProviders from '@/AppProviders';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <AppProviders>
      {component}
    </AppProviders>
  );
};

describe('PageHeader', () => {
  it('renders the title correctly', () => {
    renderWithProviders(<PageHeader title="Test Title" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title');
  });

  it('renders the description when provided', () => {
    renderWithProviders(<PageHeader title="Test Title" description="Test Description" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Description');
  });

  it('renders the actions when provided', () => {
    renderWithProviders(
      <PageHeader 
        title="Test Title" 
        actions={<button>Test Action</button>} 
      />
    );
    expect(screen.getByText('Test Action')).toBeInTheDocument();
  });
});