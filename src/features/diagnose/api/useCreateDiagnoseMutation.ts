import axiosInstance from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { Diagnose } from "../types";

interface CreateDiagnoseArgs {
  name: string;
  solution: string;
}

export const useCreateDiagnoseMutation = (
  options?: UseMutationOptions<Diagnose, unknown, CreateDiagnoseArgs>
) => {
  return useMutation({
    mutationFn: async (payload: CreateDiagnoseArgs) => {
      const response = await axiosInstance.post<Diagnose>("diagnose", payload);
      return response.data;
    },
    ...options,
  });
};
