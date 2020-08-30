import { Question } from './question';

describe('Question', () => {
  let singleAnswerQuestion: Question;
  let multiAnswerQuestion: Question;

  beforeEach(() => {
    singleAnswerQuestion = new Question(1, '1st test question');
    multiAnswerQuestion = new Question(2, '2nd test question', true);
  });

  it('should create an instance with single answers only allowed', () => {
    expect(singleAnswerQuestion.multipleAnswersAllowed).toBeFalse();
  });

  it('should create an instance with multiple answers allowed', () => {
    expect(multiAnswerQuestion.multipleAnswersAllowed).toBeTrue();
  });

  describe('Adding Answers', () => {
    it('should add an answer', () => {
      singleAnswerQuestion.addAnswer({ id: 1, answer: 'Answer 1' });
      expect(singleAnswerQuestion.answers.length).toBe(1);
    });

    it('should not allow more than 4 answers to be added', () => {
      singleAnswerQuestion.addAnswer({ id: 1, answer: 'Answer 1' });
      singleAnswerQuestion.addAnswer({ id: 2, answer: 'Answer 2' });
      singleAnswerQuestion.addAnswer({ id: 3, answer: 'Answer 3' });
      singleAnswerQuestion.addAnswer({ id: 4, answer: 'Answer 4' });
      singleAnswerQuestion.addAnswer({ id: 5, answer: 'Answer 5' });
      expect(singleAnswerQuestion.answers.length).toBe(4);
    });
  })
});
