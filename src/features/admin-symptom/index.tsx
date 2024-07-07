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

import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useDeleteSymptomsMutation } from "../symptom/api/useDeleteSymptomsMutation";
import useGetSymptomsQuery, {
  getSymptomsQuerykey,
} from "../symptom/api/useGetSymptomsQuery";
import SymptomTableHead from "./omponents/TableHead";
import SymptomTableRow from "./omponents/TableRow";
import SymptomTableToolbar from "./omponents/TableToolbar";
import UpsertSymptomModal from "./omponents/UpsertSymptomModal";

export default function AdminSymptomPage() {
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

  const { data } = useGetSymptomsQuery({
    search: searchFilter,
    page,
    take: rowsPerPage,
  });

  const { mutate: deleteSymptoms } = useDeleteSymptomsMutation({
    onSuccess: () => {
      setPage(1);
      queryClient.invalidateQueries({ queryKey: [getSymptomsQuerykey] });
      enqueueSnackbar({
        message: "Success: Symptom successfuly deleted",
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

  const handleDeleteSymptoms = (ids: number[]) => {
    deleteSymptoms({ ids });
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
          Symptoms
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Add />}
          onClick={() => setUpsertModal({ selectedId: 0, opened: true })}
        >
          Add Symptom
        </Button>
      </Stack>

      <Card>
        <SymptomTableToolbar
          selectedIds={selected || []}
          searchFilter={searchFilter}
          onSearchFilter={handleSearchFIlter}
          onDelete={handleDeleteSymptoms}
        />
        <TableContainer sx={{ overflow: "unset" }}>
          <Table sx={{ minWidth: 800 }}>
            <SymptomTableHead
              rowCount={data?.data.length || 0}
              numSelected={selected?.length || 0}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: "code", label: "Code" },
                { id: "name", label: "Name" },
                { id: "qestion", label: "Question" },
                { id: "action", label: "Action", align: "right" },
              ]}
            />
            <TableBody>
              {Children.toArray(
                data?.data.map((symptom) => (
                  <SymptomTableRow
                    symptom={symptom}
                    selected={selected?.includes(symptom.id) || false}
                    handleClick={handleChangeSelected}
                    setUpsertModal={setUpsertModal}
                    deleteSymptoms={handleDeleteSymptoms}
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
        <UpsertSymptomModal
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
