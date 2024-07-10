import axiosInstance from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { UserAnswer } from "@/features/user-answer/type";
import { UserResult } from "../type";

interface CreateSymptomArgs {
  userId: number;
  userAnswers: UserAnswer[];
}

export const useCreateUserResultMutation = (
  options?: UseMutationOptions<UserResult, unknown, CreateSymptomArgs>
) => {
  return useMutation({
    mutationFn: async (payload: CreateSymptomArgs) => {
      const response = await axiosInstance.post<UserResult>(
        "user-results",
        payload
      );
      return response.data;
    },
    ...options,
  });
};
