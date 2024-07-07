import axiosInstance from "@/utils/axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Diagnose } from "../types";
import {
  PaginationQueries,
  PaginationResponse,
} from "@/features/pagination/types";

type GetDiagnosesQueries = {
  search?: string;
} & PaginationQueries;

export const getDiagnosesQuerykey = "get-diagnoses";

const useGetDiagnosesQuery = (
  queries: GetDiagnosesQueries,
  options?: UseQueryOptions<
    unknown,
    unknown,
    PaginationResponse<Diagnose>,
    string[]
  >
) => {
  return useQuery({
    queryKey: [getDiagnosesQuerykey, queries],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginationResponse<Diagnose>>(
        "diagnoses",
        {
          params: queries,
        }
      );
      return response.data;
    },
  });
};

export default useGetDiagnosesQuery;
