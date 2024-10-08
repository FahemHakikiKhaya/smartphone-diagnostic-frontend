"use client";

import { useState, ChangeEvent, Children } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { Add } from "@mui/icons-material";
import UpsertDiagnoseModal from "./omponents/UpsertDiagnoseModal";
import useGetDiagnosesQuery, {
  getDiagnosesQuerykey,
} from "../diagnose/api/useGetDiagnosesQuery";
import DiagnoseTableHead from "./omponents/TableHead";
import DiagnoseTableRow from "./omponents/TableRow";
import DiagnoseTableToolbar from "./omponents/TableToolbar";
import { useDeleteDiagnosesMutation } from "../diagnose/api/useDeleteDiagnosesMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

export default function AdminDiagnosePage() {
  const [page, setPage] = useState<number>(1);

  const [selected, setSelected] = useState<number[] | undefined>([]);

  const [searchFilter, setSearchFilter] = useState<string>("");

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [upsertModal, setUpsertModal] = useState<{
    opened: boolean;
    selectedId?: number;
  }>({ opened: false, selectedId: 0 });

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const { data } = useGetDiagnosesQuery({
    search: searchFilter,
    page,
    take: rowsPerPage,
  });

  const { mutate: deleteDiagnoses } = useDeleteDiagnosesMutation({
    onSuccess: () => {
      setPage(1);
      queryClient.invalidateQueries({ queryKey: [getDiagnosesQuerykey] });
      enqueueSnackbar({
        message: "Success: Diagnose successfuly deleted",
        variant: "success",
      });
    },
  });

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data?.data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSearchFIlter = (value: string) => {
    setPage(1);
    setSearchFilter(value);
  };

  const handleChangeSelected = (id: number) => {
    const newSelected = [...(selected || [])];

    const index = newSelected.indexOf(id);
    if (index > -1) {
      newSelected.splice(index, 1);
    } else {
      newSelected.push(id);
    }

    setSelected(newSelected);
  };

  const handleDeleteDiagnoses = (ids: number[]) => {
    console.log(ids);
    deleteDiagnoses({ ids });
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" fontWeight={700}>
          Diagnoses
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Add />}
          onClick={() => setUpsertModal({ selectedId: 0, opened: true })}
        >
          Add Diagnose
        </Button>
      </Stack>

      <Card>
        <DiagnoseTableToolbar
          selectedIds={selected || []}
          searchFilter={searchFilter}
          onSearchFilter={handleSearchFIlter}
          onDelete={handleDeleteDiagnoses}
        />
        <TableContainer sx={{ overflow: "unset" }}>
          <Table sx={{ minWidth: 800 }}>
            <DiagnoseTableHead
              rowCount={data?.data.length || 0}
              numSelected={selected?.length || 0}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: "code", label: "Code" },
                { id: "name", label: "Name" },
                { id: "description", label: "Description" },
                { id: "solution", label: "Solution" },
                { id: "action", label: "Action", align: "right" },
              ]}
            />
            <TableBody>
              {Children.toArray(
                data?.data.map((diagnose) => (
                  <DiagnoseTableRow
                    diagnose={diagnose}
                    selected={selected?.includes(diagnose.id) || false}
                    handleClick={handleChangeSelected}
                    setUpsertModal={setUpsertModal}
                    deleteDiagnoses={handleDeleteDiagnoses}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          page={page - 1}
          component="div"
          count={data?.meta.total ? data?.meta.total : 5}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <UpsertDiagnoseModal
          initialValues={data?.data.find(
            ({ id }) => id === upsertModal.selectedId
          )}
          opened={upsertModal.opened}
          onClose={() =>
            setUpsertModal({
              ...upsertModal,
              opened: false,
            })
          }
          type={upsertModal.selectedId ? "Update" : "Create"}
        />{" "}
      </Card>
    </>
  );
}
