"use client";

import { ProgressCircle } from "@/components/progress-circle";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo, useRef } from "react";
import useGetUserResultQuery from "../user-result/api/useGetUserResult";
import { useRouter } from "next/navigation";

const columns: GridColDef[] = [
  { field: "id", headerName: "Code", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "question", headerName: "Question", width: 350 },
  {
    field: "answer",
    headerName: "Answer",
  },
];

const DiagnoseResultPage = ({ id }: { id: number }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: result } = useGetUserResultQuery(id);

  const scrollToComponent = () => {
    const topOffset = 100; // Adjust this value to the desired offset from the top
    const elementPosition = targetRef.current?.getBoundingClientRect().top || 0;
    const offsetPosition = elementPosition + window.pageYOffset - topOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const tableRows = useMemo(() => {
    return result?.answers?.map(({ answer, symptom }) => {
      return {
        id: symptom?.code,
        name: symptom?.name,
        question: symptom?.question,
        answer: answer ? "Yes" : "No",
      };
    });
  }, [result?.answers]);

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
      <Container sx={{ position: "relative", pb: "200px" }}>
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
                  {result?.certainties[0].diagnose.name}
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
                {result?.certainties[0].diagnose.solution}
              </Typography>{" "}
              <Stack direction="row" spacing={2} mt={5}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ mt: 4 }}
                  onClick={() => router.replace("/diagnose")}
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
                <ProgressCircle
                  percents={result?.certainties[0].certainty * 100}
                  size={300}
                  fontSize={50}
                />
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
          rows={tableRows || []}
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
