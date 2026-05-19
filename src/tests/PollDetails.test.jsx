import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import PollDetails from '../components/PollDetails';

const mockPollsReducer = (state = {}) => state;
const mockAuthReducer = (state = {}) => state;
const mockUsersReducer = (state = {}) => state;

function createStore(preloadedState) {
  return configureStore({
    reducer: {
      polls: mockPollsReducer,
      auth: mockAuthReducer,
      users: mockUsersReducer
    },
    preloadedState
  });
}

describe('Answered Poll Details', () => {
  it('should display correct vote percentages', () => {
    const store = createStore({
      polls: {
        testId: {
          id: 'testId',
          author: 'sarahedo',
          optionOne: {
            text: 'Option One',
            votes: ['sarahedo', 'tylermcginnis'],
          },
          optionTwo: {
            text: 'Option Two',
            votes: ['zoshikanlu']
          }
        }
      },
      auth: {
        authedUser: 'sarahedo'
      },
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          answers: {
            testId: 'optionOne'
          }
        }
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/questions/testId']}>
          <Routes>
            <Route path="/questions/:id" element={<PollDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Total votes = 3
    // optionOne = 2 votes → 67%
    // optionTwo = 1 vote → 33%
    expect(screen.getByText(/2 votes \(67%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/1 vote \(33%\)/i)).toBeInTheDocument();

    // also verify "Your choice" appears
    expect(screen.getByText('Your choice')).toBeInTheDocument();
  });
});