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
import useGetDiagnoseSymptomsQuery, {
  getDiagnoseSymptomsQuerykey,
} from "../diagnose-symptom/api/useGetDiagnoseSymptomsQuery";
import useGetSymptomsQuery from "../symptom/api/useGetSymptomsQuery";
import CreateDiagnoseSymptomModal from "./omponents/CreateModal";
import { useDeleteDiagnoseSymptomsMutation } from "../diagnose-symptom/api/useDeleteDiagnosesMutation";
import DiagnoseSymptomsTableToolbar from "./omponents/TableToolbar";
import DiagnoseSymptomsTableHead from "./omponents/TableHead";
import DiagnoseSymptomsTableRow from "./omponents/TableRow";

export default function AdminDiagnoseDetailPage({ id }: { id: number }) {
  const [page, setPage] = useState<number>(1);

  const [selected, setSelected] = useState<number[] | undefined>([]);

  const [searchFilter, setSearchFilter] = useState<string>("");

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [createModal, setCreateModal] = useState<{
    opened: boolean;
    selectedId?: number;
  }>({ opened: false, selectedId: 0 });

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const { data: diagnoseSymptoms } = useGetDiagnoseSymptomsQuery({
    id,
    search: searchFilter,
  });

  const { data: symptomsOptions } = useGetSymptomsQuery({ all: true });

  const { mutate: deleteDiagnoseSymptoms } = useDeleteDiagnoseSymptomsMutation({
    onSuccess: () => {
      setPage(1);
      setSelected([]);
      queryClient.invalidateQueries({
        queryKey: [getDiagnoseSymptomsQuerykey],
      });
      enqueueSnackbar({
        message: "Success: Diagnose successfuly deleted",
        variant: "success",
      });
    },
  });

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = diagnoseSymptoms?.data.map((n) => n.id);
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

  const handleDeleteDiagnoseSymptoms = (ids: number[]) => {
    deleteDiagnoseSymptoms({ ids });
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
          {diagnoseSymptoms?.data[0]?.diagnose.name} Symptoms
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Add />}
          onClick={() => setCreateModal({ selectedId: 0, opened: true })}
        >
          Add Symptom
        </Button>
      </Stack>

      <Card>
        <DiagnoseSymptomsTableToolbar
          selectedIds={selected || []}
          searchFilter={searchFilter}
          onSearchFilter={handleSearchFIlter}
          onDelete={handleDeleteDiagnoseSymptoms}
        />
        <TableContainer sx={{ overflow: "unset" }}>
          <Table sx={{ minWidth: 800 }}>
            <DiagnoseSymptomsTableHead
              rowCount={diagnoseSymptoms?.data.length || 0}
              numSelected={selected?.length || 0}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: "code", label: "Code" },
                { id: "name", label: "Name" },
                { id: "question", label: "Question" },
                { id: "action", label: "Action", align: "right" },
              ]}
            />
            <TableBody>
              {Children.toArray(
                diagnoseSymptoms?.data.map((diagnoseSymptom) => (
                  <DiagnoseSymptomsTableRow
                    diagnoseSymptom={diagnoseSymptom}
                    selected={selected?.includes(diagnoseSymptom.id) || false}
                    handleClick={handleChangeSelected}
                    setCreateModal={setCreateModal}
                    deleteDiagnoseSymptoms={handleDeleteDiagnoseSymptoms}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          page={page - 1}
          component="div"
          count={
            diagnoseSymptoms?.meta.total ? diagnoseSymptoms?.meta.total : 5
          }
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <CreateDiagnoseSymptomModal
          diagnoseId={id}
          symptomOptions={symptomsOptions?.data || []}
          opened={createModal.opened}
          onClose={() =>
            setCreateModal({
              ...createModal,
              opened: false,
            })
          }
        />{" "}
      </Card>
    </>
  );
}
