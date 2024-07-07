import axiosInstance from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

interface DeleteSymptomsArgs {
  ids: number[];
}

export const useDeleteSymptomsMutation = (
  options?: UseMutationOptions<unknown, unknown, DeleteSymptomsArgs>
) => {
  return useMutation({
    mutationFn: async (payload: DeleteSymptomsArgs) => {
      const response = await axiosInstance.delete<unknown>("symptoms", {
        data: payload,
      });
      return response.data;
    },
    ...options,
  });
};
