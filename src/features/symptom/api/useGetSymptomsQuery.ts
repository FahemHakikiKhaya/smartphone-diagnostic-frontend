import axiosInstance from "@/utils/axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import {
  PaginationQueries,
  PaginationResponse,
} from "@/features/pagination/types";
import { Symptom } from "../type";

type GetSymptomsQueries = {
  search?: string;
  all?: boolean;
} & PaginationQueries;

export const getSymptomsQuerykey = "get-symptoms";

const useGetSymptomsQuery = (
  queries?: GetSymptomsQueries,
  options?: UseQueryOptions<
    unknown,
    unknown,
    PaginationResponse<Symptom>,
    string[]
  >
) => {
  return useQuery({
    queryKey: ["get-symptoms", queries],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginationResponse<Symptom>>(
        "symptoms",
        {
          params: queries,
        }
      );
      return response.data;
    },
  });
};

export default useGetSymptomsQuery;
