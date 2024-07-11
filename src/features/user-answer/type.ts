import { Symptom } from "../symptom/type";

export type UserAnswer = {
  symptomId: number;
  answer: boolean;
  certaintyFactor?: number;
  symptom?: Symptom;
};
