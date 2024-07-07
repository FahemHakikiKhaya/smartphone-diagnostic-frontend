import axiosInstance from "@/utils/axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import {
  PaginationQueries,
  PaginationResponse,
} from "@/features/pagination/types";
import { DiagnoseSymptom } from "../type";

export const getDiagnoseSymptomsQuerykey = "get-diagnose-symptoms";

const useGetDiagnoseSymptomsQuery = (
  queries: { id: number; search: string },
  options?: UseQueryOptions<
    unknown,
    unknown,
    PaginationResponse<DiagnoseSymptom>,
    string[]
  >
) => {
  return useQuery({
    queryKey: [getDiagnoseSymptomsQuerykey, queries],
    queryFn: async () => {
      const response = await axiosInstance.get<
        PaginationResponse<DiagnoseSymptom>
      >("diagnose-symptoms", {
        params: queries,
      });
      return response.data;
    },
  });
};

export default useGetDiagnoseSymptomsQuery;
