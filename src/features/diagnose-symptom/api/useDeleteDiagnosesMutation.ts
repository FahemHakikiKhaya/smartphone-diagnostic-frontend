import axiosInstance from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

interface DeleteDiagnoseSymptomsArgs {
  ids: number[];
}

export const useDeleteDiagnoseSymptomsMutation = (
  options?: UseMutationOptions<unknown, unknown, DeleteDiagnoseSymptomsArgs>
) => {
  return useMutation({
    mutationFn: async (payload: DeleteDiagnoseSymptomsArgs) => {
      const response = await axiosInstance.delete<unknown>(
        "diagnose-symptoms",
        {
          data: payload,
        }
      );
      return response.data;
    },
    ...options,
  });
};
