it('should return formatted question when valid data is passed to _saveQuestion', async () => {
  const question = await _saveQuestion({
    optionOneText: 'React',
    optionTwoText: 'Vue',
    author: 'sarahedo',
  });

  expect(question).toHaveProperty('id');
  expect(question.author).toBe('sarahedo');
  expect(question.optionOne.text).toBe('React');
  expect(question.optionTwo.text).toBe('Vue');
});

it('should return error when invalid data is passed to _saveQuestion', async () => {
  await expect(
    _saveQuestion({ optionOneText: '', optionTwoText: '' })
  ).rejects.toBe('Please provide optionOneText, optionTwoText, and author');
});

it('should return true when valid answer is saved', async () => {
  const result = await _saveQuestionAnswer({
    authedUser: 'sarahedo',
    qid: '8xf0y6ziyjabvozdd253nd',
    answer: 'optionOne',
  });

  expect(result).toBe(true);
});

it('should return error when invalid data is passed to _saveQuestionAnswer', async () => {
  await expect(
    _saveQuestionAnswer({})
  ).rejects.toBe('Please provide authedUser, qid, and answer');
});