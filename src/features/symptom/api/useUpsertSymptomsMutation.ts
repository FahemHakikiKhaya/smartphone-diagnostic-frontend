import axiosInstance from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { Symptom } from "../type";

interface CreateSymptomArgs {
  code?: string;
  name: string;
  question: string;
}

export const useUpsertSymptomMutation = (
  options?: UseMutationOptions<Symptom, unknown, CreateSymptomArgs>
) => {
  return useMutation({
    mutationFn: async (payload: CreateSymptomArgs) => {
      const response = await axiosInstance.put<Symptom>("symptoms", payload);
      return response.data;
    },
    ...options,
  });
};
