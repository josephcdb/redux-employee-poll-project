import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Navigation from '../components/Navigation';

const mockState = {
  auth: {
    authedUser: 'sarahedo',
  },
  users: {
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      avatarURL: '/avatar.png',
      answers: {
        q1: 'optionOne',
        q2: 'optionTwo',
      },
      questions: ['q1', 'q2'],
    },
  },
};

function createMockStore(state = mockState) {
  return configureStore({
    reducer: (store = state) => store,
  });
}

describe('Navigation', () => {
  it('should render the list of navigation links', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });
});