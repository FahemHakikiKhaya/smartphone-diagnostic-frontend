import { User } from "@/features/user/type";
import axiosInstance from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

interface RegisterArgs {
  email: string;
  username: string;
  password: string;
}

export const useRegisterMutation = (
  options?: UseMutationOptions<User, unknown, RegisterArgs>
) => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: async (payload: RegisterArgs) => {
      const response = await axiosInstance.post<User>("auth/register", payload);
      return response.data;
    },
    ...options,
    onSuccess: (data) => {
      enqueueSnackbar({
        variant: "success",
        message: "Registered Successfuly",
      });

      if (options?.onSuccess) {
        options.onSuccess(
          data,
          {
            email: "",
            password: "",
            username: "",
          },
          null
        );
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
