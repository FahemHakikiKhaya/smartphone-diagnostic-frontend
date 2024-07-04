import axiosInstance from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

interface DeleteDiagnosesArgs {
  ids: number[];
}

export const useDeleteDiagnosesMutation = (
  options?: UseMutationOptions<unknown, unknown, DeleteDiagnosesArgs>
) => {
  return useMutation({
    mutationFn: async (payload: DeleteDiagnosesArgs) => {
      const response = await axiosInstance.delete<unknown>("diagnoses", {
        data: payload,
      });
      return response.data;
    },
    ...options,
  });
};
