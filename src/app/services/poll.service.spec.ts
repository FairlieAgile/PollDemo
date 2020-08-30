import { TestBed } from '@angular/core/testing';
import { Question } from '../models/question';
import { Poll } from './../models/poll';
import { User } from './../models/user';
import { PollService } from './poll.service';


describe('PollService', () => {
  let service: PollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have no polls when created', () => {
    service.polls$.subscribe(p => expect(p.length).toBe(0))
  });

  it('should return a list of polls', () => {
    service.add(new Poll(1, '1st test poll'));
    service.add(new Poll(2, '2nd test poll'));
    service.polls$.subscribe(p => expect(p.length).toBe(2))
  })

  describe('Submit poll answer', () => {
    let poll: Poll;
    let user: User;

    beforeEach(() => {
      // setup poll
      user = { id: 1, firstName: 'Paul', lastName: 'Blair' };
      poll = new Poll(5, 'a test poll');
      let singleAnswerQuestion = new Question(1, '1st test question');
      let multiAnswerQuestion = new Question(2, '2nd test question', true);

      singleAnswerQuestion.addAnswer({ id: 1, answer: 'Answer 1' });
      singleAnswerQuestion.addAnswer({ id: 2, answer: 'Answer 2' });
      singleAnswerQuestion.addAnswer({ id: 3, answer: 'Answer 3' });
      singleAnswerQuestion.addAnswer({ id: 4, answer: 'Answer 4' });

      multiAnswerQuestion.addAnswer({ id: 5, answer: 'Answer 5' });
      multiAnswerQuestion.addAnswer({ id: 6, answer: 'Answer 6' });
      multiAnswerQuestion.addAnswer({ id: 7, answer: 'Answer 7' });

      poll.addQuestion(singleAnswerQuestion);
      poll.addQuestion(multiAnswerQuestion);
      service.add(poll);
    });

    it('should submit an answer to a poll question', () => {
      let result = service.submitAnswer(5, user, 1, 2)
      expect(result).toBeTrue();
    })

    it('should allow multiple answers for a multi answer question', () => {
      let result = service.submitAnswer(5, user, 2, 5, 6)
      expect(result).toBeTrue();
    })

    it('should require an answer to be submitted with a question', () => {
      expect(function () { service.submitAnswer(5, user, 1) }).toThrow(new Error('No answers submitted'));
    })

    it('should not allow multiple answers for a single answer question', () => {
      expect(function () { service.submitAnswer(5, user, 1, 1, 2) }).toThrow(new Error('Cannot add multiple answers for this question'));
    })

    it('should return an error if poll not found', () => {
      expect(function () { service.submitAnswer(6, user, 1, 1, 2) }).toThrow(new Error('Poll or question not found'));
    })

    it('should return an error if question not found', () => {
      expect(function () { service.submitAnswer(5, user, 10, 1, 2) }).toThrow(new Error('Poll or question not found'));
    })
  })
});
