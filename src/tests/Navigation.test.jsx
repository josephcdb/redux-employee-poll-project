it('renders navigation links', () => {
  render(<Navigation />);

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  expect(screen.getByText('New')).toBeInTheDocument();
});