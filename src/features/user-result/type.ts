import { UserAnswer } from "../user-answer/type";
import { UserCertainty } from "../user-certanties/type";
import { User } from "../user/type";

export type UserResult = {
  id: number;
  userId: number;
  user: User;
  answers: UserAnswer[];
  certainties: UserCertainty[];
};
