import { User } from "@/features/user/type";
import axiosInstance from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

interface LoginArgs {
  email: string;
  password: string;
}

export const useLoginMutation = (
  options?: UseMutationOptions<User, unknown, LoginArgs>
) => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: async (payload: LoginArgs) => {
      const response = await axiosInstance.post<User>("auth/login", payload);
      return response.data;
    },
    onSuccess: (data) => {
      enqueueSnackbar({ variant: "success", message: "Logged in Successfuly" });

      if (options?.onSuccess) {
        options.onSuccess(data, { email: "", password: "" }, null);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar({
        message: error.response.data.message,
        variant: "error",
      });
    },
  });
};
