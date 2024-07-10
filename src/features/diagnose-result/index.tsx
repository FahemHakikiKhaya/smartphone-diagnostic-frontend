"use client";

import { ProgressCircle } from "@/components/progress-circle";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRef } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 11, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 12, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 13, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 14, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const DiagnoseResultPage = ({ id }: { id: number }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const scrollToComponent = () => {
    const topOffset = 100; // Adjust this value to the desired offset from the top
    const elementPosition = targetRef.current?.getBoundingClientRect().top || 0;
    const offsetPosition = elementPosition + window.pageYOffset - topOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        backgroundImage:
          "linear-gradient(0deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        height: "100vh",
        position: "relative" as "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(18,18,18,1) 100%)",
        }}
      />
      <Container sx={{ position: "relative" }}>
        <Stack width="100%" height="100vh" justifyContent="center">
          <Grid
            container
            columnSpacing={10}
            direction={{ md: "row" }}
            alignItems="center"
          >
            <Grid item md={7}>
              <Typography
                fontSize={50}
                fontWeight="bold"
                color="text.disabled"
                mb={4}
              >
                Your Smarphone has <br />
                <Typography
                  fontSize={50}
                  mt={6}
                  fontWeight="bold"
                  component="span"
                  color="white"
                >
                  Battery Issues
                </Typography>
              </Typography>
              <Typography fontSize={16} mt={1}>
                <Typography
                  fontSize={16}
                  fontWeight="bold"
                  color="text.disabled"
                  component="span"
                >
                  What is Battery Issues:{" "}
                </Typography>
                Battery issues can range from fast draining and overheating to
                not charging or swelling, affecting overall device performance
                and safety
              </Typography>
              <Typography fontSize={16} mt={1}>
                <Typography
                  fontSize={16}
                  fontWeight="bold"
                  color="text.disabled"
                  component="span"
                >
                  What can you do:{" "}
                </Typography>
                Optimize battery usage by reducing screen brightness, closing
                background apps, disconnecting unnecessary connections, and
                ensuring proper charging practices.
              </Typography>{" "}
              <Stack direction="row" spacing={2} mt={5}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ mt: 4 }}
                >
                  Retake Diagnose
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 4 }}
                  endIcon={<ArrowDownwardIcon />}
                  onClick={() => scrollToComponent()}
                >
                  View Answers
                </Button>
              </Stack>
            </Grid>
            <Grid item md={5}>
              <Stack alignItems="center">
                <ProgressCircle percents={80} size={300} fontSize={50} />
                <Typography fontSize={30} fontWeight="bold" mt={5}>
                  Certainty Level
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        {/* <Stack height="400px"> */}
        <DataGrid
          ref={targetRef}
          rows={rows}
          columns={columns}
          // initialState={{
          //   pagination: {
          //     paginationModel: { page: 0, pageSize: 5 },
          //   },
          // }}
          // pageSizeOptions={[5, 10]}
          hideFooterPagination
          autoHeight
        />
        {/* </Stack> */}
      </Container>
    </Box>
  );
};

export default DiagnoseResultPage;
