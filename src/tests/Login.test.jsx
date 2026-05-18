import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../components/Login';
import { Provider } from 'react-redux';
import store from '../store';

it('shows error when login is submitted without selecting user', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  fireEvent.click(screen.getByText(/login/i));

  expect(screen.getByText(/please select a user/i)).toBeInTheDocument();
});