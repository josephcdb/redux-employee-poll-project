import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import Login from '../components/Login';
import authReducer from '../reducers/authReducer';
import userReducer from '../reducers/userReducer';

function createMockStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: userReducer,
    },
    preloadedState: {
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
        },
        tylermcginnis: {
          id: 'tylermcginnis',
          name: 'Tyler McGinnis',
        },
      },
      auth: {
        // Initial State
        authedUser: null,
      },
    },
  });
}

describe('Login Page', () => {
  it('should show error when login is submitted without selecting any user', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Click the Login button without selecting any user
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Return an error message
    expect(screen.getByText('Please select a user')).toBeInTheDocument();
  });

  it('should return success when any user is selected', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Select the option element
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'sarahedo' },
    });

    // Click the Login button
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // After dispatch, it checks the final state from the fireEvent change i.e. sarahedo
    expect(store.getState().auth.authedUser).toBe('sarahedo');
  });
});