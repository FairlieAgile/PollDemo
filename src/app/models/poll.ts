import { PollStatus } from './poll-status.enum';
import { Question } from './question';

export class Poll {
  id: number;
  name: string;
  status: PollStatus;
  questions: Question[];

  constructor(
    id: number,
    name: string,
    status: PollStatus = PollStatus.Unpublished) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.questions = [];
  }

  public addQuestion(question: Question) {
    this.questions.push(question);
  }

  public publish() {
    if (this.status !== PollStatus.Closed)
      this.status = PollStatus.Published
  }

  public close() {
    this.status = PollStatus.Closed
  }
}
