"use client";

import { useState, MouseEvent, ChangeEvent } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

// import TableNoData from "../table-no-data";
// import TableEmptyRows from "../table-empty-rows";
// import UserTableToolbar from "../user-table-toolbar";
// import { emptyRows, applyFilter, getComparator } from "../utils";
import UserTableHead from "./omponents/TableHead";
import UserTableRow from "./omponents/TableRow";
import Scrollbar from "@/components/scrollbar";
import { Add } from "@mui/icons-material";
import UpsertDiagnoseModal from "./omponents/UpsertDiagnoseModal";

// ----------------------------------------------------------------------

interface User {
  id: string;
  name: string;
  company: string;
  role: string;
  isVerified: boolean;
  status: string;
  avatarUrl: string;
}

export default function AdminDiagnosePage() {
  const [page, setPage] = useState<number>(0);

  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState<keyof User>("name");

  const [filterName, setFilterName] = useState<string>("");

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [upsertModal, setUpsertModal] = useState<{
    opened: boolean;
    selectedId: number;
  }>({ opened: false, selectedId: 0 });

  const handleSort = (event: MouseEvent<unknown>, id: keyof User) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = ["test"];

  const notFound = !dataFiltered.length && !!filterName;

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
          onClick={() => setUpsertModal({ ...upsertModal, opened: true })}
        >
          Add Diagnose
        </Button>
      </Stack>

      <Card>
        {/* <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}
        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                // rowCount={users.length}
                numSelected={selected.length}
                // onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "name", label: "Name" },
                  { id: "company", label: "Company" },
                  { id: "role", label: "Role" },
                  { id: "isVerified", label: "Verified", align: "center" },
                  { id: "status", label: "Status" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: User) => (
                    <UserTableRow
                      key={row.id}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                {/* <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <UpsertDiagnoseModal
          opened={upsertModal.opened}
          onClose={() => setUpsertModal({ ...upsertModal, opened: false })}
        />{" "}
      </Card>
    </>
  );
}
