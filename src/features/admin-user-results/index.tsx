"use client";

import { Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo, useRef } from "react";
import useGetUserResultsQuery from "../user-result/api/useGetUserResults";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "diagnose", headerName: "Diagnose", width: 350 },
  {
    field: "certainty",
    headerName: "Certainty Level",
    width: 200,
  },
];

const AdminUserResultPage = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { data: userResults } = useGetUserResultsQuery();

  const tableRows = useMemo(() => {
    return userResults?.map(({ certainties, user }, index) => {
      return {
        id: index + 1,
        username: user.username,
        diagnose: certainties[0].diagnose.name,
        certainty: `${certainties[0].certainty * 100} %`,
      };
    });
  }, [userResults]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" fontWeight={700}>
          User Results
        </Typography>
      </Stack>
      <DataGrid
        ref={targetRef}
        rows={tableRows || []}
        columns={columns}
        hideFooterPagination
        autoHeight
        sx={{ mt: 10 }}
      />
    </>
  );
};

export default AdminUserResultPage;
