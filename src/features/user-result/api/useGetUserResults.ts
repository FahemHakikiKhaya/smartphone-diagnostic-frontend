import axiosInstance from "@/utils/axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { PaginationResponse } from "@/features/pagination/types";
import { UserResult } from "../type";

export const getUserResultQueryKey = "get-user-results";

const useGetUserResultsQuery = (
  options?: UseQueryOptions<
    unknown,
    unknown,
    PaginationResponse<UserResult[]>,
    string[]
  >
) => {
  return useQuery({
    queryKey: [getUserResultQueryKey],
    queryFn: async () => {
      const response = await axiosInstance.get<UserResult[]>(`user-results`);
      return response.data;
    },
  });
};

export default useGetUserResultsQuery;
