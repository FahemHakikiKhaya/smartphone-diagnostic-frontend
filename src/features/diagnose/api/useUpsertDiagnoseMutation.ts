import axiosInstance from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { Diagnose } from "../types";

interface CreateDiagnoseArgs {
  code?: string;
  name: string;
  solution: string;
}

export const useUpsertDiagnoseMutation = (
  options?: UseMutationOptions<Diagnose, unknown, CreateDiagnoseArgs>
) => {
  return useMutation({
    mutationFn: async (payload: CreateDiagnoseArgs) => {
      const response = await axiosInstance.put<Diagnose>("diagnoses", payload);
      return response.data;
    },
    ...options,
  });
};
