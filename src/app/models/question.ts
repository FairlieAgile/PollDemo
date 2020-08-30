import { Answer } from './answer';

export class Question {
  id: number;
  question: string;
  multipleAnswersAllowed: boolean;
  answers: Answer[];

  constructor(id: number, question: string, multipleAnswersAllowed: boolean = false) {
    this.id = id;
    this.question = question;
    this.multipleAnswersAllowed = multipleAnswersAllowed;
    this.answers = [];
  }

  public addAnswer(answer: Answer) {
    if (this.answers.length < 4)
      this.answers.push(answer);
    // else
    //   errorService
  }
}
