import { Poll } from './poll';
import { PollStatus } from './poll-status.enum';
import { Question } from './question';

describe('Poll Class', () => {
  let poll: Poll;

  beforeEach(() => {
    poll = new Poll(1, '1st test poll');
  });

  it('should create an instance', () => {
    expect(poll).toBeTruthy();
  });

  it('should create an instance with default status of Unpublished', () => {
    expect(poll.status).toBe(PollStatus.Unpublished);
  });

  it('should add a question to a poll', () => {
    poll.addQuestion(new Question(1, 'question 1'));
    expect(poll.questions.length).toBe(1);
  });

  it('should publish an unpublished poll', () => {
    poll.publish();
    expect(poll.status).toBe(PollStatus.Published);
  });

  it('should close a poll', () => {
    poll.close();
    expect(poll.status).toBe(PollStatus.Closed);
  });

  it('should not re-open a closed poll', () => {
    poll.close();
    poll.publish();
    expect(poll.status).toBe(PollStatus.Closed);
  });
});
