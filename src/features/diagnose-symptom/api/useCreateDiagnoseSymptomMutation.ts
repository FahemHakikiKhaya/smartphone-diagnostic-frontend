import axiosInstance from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { DiagnoseSymptom } from "../type";

interface CreateDiagnoseArgs {
  diagnoseId: number;
  symptomId: number;
  certaintyFactor: number;
}

export const useCreateDiagnoseSymptomMutation = (
  options?: UseMutationOptions<DiagnoseSymptom, unknown, CreateDiagnoseArgs>
) => {
  return useMutation({
    mutationFn: async (payload: CreateDiagnoseArgs) => {
      const response = await axiosInstance.post<DiagnoseSymptom>(
        "diagnose-symptoms",
        payload
      );
      return response.data;
    },
    ...options,
  });
};
