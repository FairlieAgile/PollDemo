import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Poll } from './../models/poll';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private pollsSubject$: BehaviorSubject<Poll[]> = new BehaviorSubject<Poll[]>([]);
  polls$: Observable<Poll[]> = this.pollsSubject$.asObservable();

  constructor() { }

  add(poll: Poll) {
    let polls = this.pollsSubject$.getValue();
    polls.push(poll);
    this.pollsSubject$.next(polls);
  }

  submitAnswer(pollId: number, user: User, questionId: number, ...userAnswerIds: number[]): boolean {
    let polls = this.pollsSubject$.getValue();
    let question = polls.find(p => p.id === pollId)?.questions.find(q => q.id === questionId);

    if (!question)
      throw new Error('Poll or question not found')

    if (userAnswerIds.length === 0)
      throw new Error('No answers submitted')

    if (!question.multipleAnswersAllowed && userAnswerIds.length > 1)
      throw new Error('Cannot add multiple answers for this question')

    // save answer
    return true;
  }
}
