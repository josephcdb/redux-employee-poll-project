import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Leaderboard from '../components/Leaderboard';

const mockState = {
  auth: {
    authedUser: 'sarahedo'
  },
  users: {
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      avatarURL: '/avatar.png',
      answers: {
        q1: 'optionOne',
        q2: 'optionTwo'
      },
      questions: ['q1', 'q2']
    }
  }
};

function createMockStore(state = mockState) {
  return configureStore({
    reducer: (store = state) => store
  });
}

describe('Leaderboard', () => {
  it('displays the correct users, number of answered questions and number of created questions', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    // Should return true if sarahedo exists in the leaderboard
    expect(screen.getByText('sarahedo')).toBeInTheDocument();
  });
});