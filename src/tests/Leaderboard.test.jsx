it('displays user stats correctly', () => {
  render(<Leaderboard />);

  expect(screen.getByText(/sarahedo/i)).toBeInTheDocument();
});