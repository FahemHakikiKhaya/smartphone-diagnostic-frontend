"use client";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import useGetSymptomsQuery from "../symptom/api/useGetSymptomsQuery";
import { Formik } from "formik";
import { useCreateUserResultMutation } from "../user-result/api/useCreateUserResultMutation";
import { Symptom } from "../symptom/type";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "@/provider/AuthProvider";

export default function DiagnosePage() {
  const [scaleX, setScaleX] = useState<number>(0);
  const { user } = useAuth();

  const {
    data: {
      data: questions = [],
      meta: { total: totalQuestions = 0 } = {},
    } = {},
    isLoading,
  } = useGetSymptomsQuery({
    all: true,
  });

  const { mutateAsync: createUserResult } = useCreateUserResultMutation();
  const router = useRouter();

  const handlePostUserResult = async (
    userId: number,
    answers: string[],
    questions: Symptom[]
  ) => {
    const userAnswers = questions.map(({ id }, index) => {
      return {
        symptomId: id,
        answer: Boolean(answers[index] === "true"),
      };
    });

    const userResult = await createUserResult({
      userId,
      userAnswers,
    });

    router.replace(`/diagnose/result/${userResult.id}`);
  };

  return (
    <Formik
      initialValues={{
        answers: [],
        currentAnswer: "",
        currentIndex: 0,
      }}
      onSubmit={async (values, { setFieldValue }) => {
        const newAnswers: string[] = values.answers;
        newAnswers[values.currentIndex] = values.currentAnswer;
        setFieldValue("answers", newAnswers);
        setFieldValue(
          "currentAnswer",
          values.answers[values.currentIndex + 1] || ""
        );
        setScaleX(scaleX + 1 / totalQuestions);

        if (values.currentIndex + 1 === totalQuestions && questions && user) {
          return await handlePostUserResult(
            user?.id,
            values.answers,
            questions
          );
        }

        setFieldValue("currentIndex", values.currentIndex + 1);
      }}
    >
      {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
        <Box position="relative">
          <Box
            component={motion.div}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: scaleX }}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: "10px",
              backgroundColor: "white",
              transformOrigin: "0%",
            }}
          />
          <Container>
            <Stack height="100vh" alignItems="center" justifyContent="center">
              {isLoading ? (
                <CircularProgress size="60px" />
              ) : (
                <Stack>
                  <Typography
                    fontSize={{ md: "22px" }}
                    fontWeight={{ md: 800 }}
                    mb={4}
                  >
                    {questions[values.currentIndex].question}{" "}
                  </Typography>
                  <Stack width="100%" spacing={3}>
                    <Typography
                      component={motion.div}
                      whileHover={{ y: -8, borderColor: "white" }}
                      transition={{ duration: 0.3 }}
                      sx={{
                        borderColor:
                          values.currentAnswer === "true"
                            ? "white !important"
                            : "action.disabled",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderRadius: 2,
                        p: 1.5,
                        cursor: "pointer",
                      }}
                      onClick={() => setFieldValue("currentAnswer", "true")}
                    >
                      Yes
                    </Typography>
                    <Typography
                      component={motion.div}
                      whileHover={{ y: -8, borderColor: "white" }}
                      transition={{ duration: 0.3 }}
                      sx={{
                        borderColor:
                          values.currentAnswer === "false"
                            ? "white !important"
                            : "action.disabled",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderRadius: 2,
                        p: 1.5,
                        cursor: "pointer",
                      }}
                      onClick={() => setFieldValue("currentAnswer", "false")}
                    >
                      No
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    mt={4}
                    justifyContent="end"
                    spacing={2}
                  >
                    {values.currentIndex !== 0 && (
                      <Button
                        size="large"
                        color="primary"
                        variant="outlined"
                        sx={{ width: "fit-content" }}
                        onClick={() => {
                          setFieldValue(
                            "currentAnswer",
                            values.answers[values.currentIndex - 1] || ""
                          );
                          setFieldValue(
                            "currentIndex",
                            values.currentIndex - 1
                          );
                          setScaleX(scaleX - 1 / totalQuestions);
                        }}
                      >
                        Previous
                      </Button>
                    )}
                    <LoadingButton
                      size="large"
                      color="primary"
                      variant="contained"
                      sx={{ width: "fit-content" }}
                      onClick={() => handleSubmit()}
                      loading={isSubmitting}
                    >
                      Next
                    </LoadingButton>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Container>
        </Box>
      )}
    </Formik>
  );
}
