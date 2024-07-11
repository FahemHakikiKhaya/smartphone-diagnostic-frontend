import { UserAnswer } from "../user-answer/type";
import { UserCertainty } from "../user-certanties/type";

export type UserResult = {
  id: number;
  userId: number;
  answers: UserAnswer[];
  certainties: UserCertainty[];
};
