import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PollCard from '../components/PollCard';

const mockPoll = {
  id: '1',
  author: 'sarahedo',
  timestamp: 123456789,
  optionOne: { text: 'A' },
  optionTwo: { text: 'B' }
};

describe('Poll Card', () => {
  it('should match snapshot', () => {
    const { fragment } = render(
      <MemoryRouter>
        <PollCard poll={mockPoll} />
      </MemoryRouter>
    );
    
    // Return snapshot test
    expect(fragment).toMatchSnapshot();
  });

  it('should render poll card correctly', () => {
    render(
      <MemoryRouter>
        <PollCard poll={mockPoll} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockPoll.author)).toBeInTheDocument();
    expect(screen.getByText(/show/i)).toBeInTheDocument();
  });
});