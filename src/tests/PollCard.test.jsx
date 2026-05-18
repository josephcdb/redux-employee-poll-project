import { render } from '@testing-library/react';
import PollCard from '../components/PollCard';

it('matches snapshot', () => {
  const poll = {
    id: '1',
    author: 'sarahedo',
    timestamp: 123456789,
    optionOne: { text: 'A' },
    optionTwo: { text: 'B' },
  };

  const { asFragment } = render(<PollCard poll={poll} />);
  expect(asFragment()).toMatchSnapshot();
});

it('renders poll card correctly', () => {
  render(<PollCard poll={mockPoll} />);

  expect(screen.getByText(mockPoll.author)).toBeInTheDocument();
  expect(screen.getByText(/show/i)).toBeInTheDocument();
});
