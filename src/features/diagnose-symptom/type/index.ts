import { Diagnose } from "@/features/diagnose/types";
import { Symptom } from "@/features/symptom/type";

export type DiagnoseSymptom = {
  id: number;
  diagnose: Diagnose;
  symptom: Symptom;
};
