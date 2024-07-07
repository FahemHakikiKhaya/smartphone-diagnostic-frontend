"use client";

import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { FC, useMemo } from "react";
import * as Yup from "yup";
import { Symptom } from "@/features/symptom/type";
import { useUpsertSymptomMutation } from "@/features/symptom/api/useUpsertSymptomsMutation";
import { getSymptomsQuerykey } from "@/features/symptom/api/useGetSymptomsQuery";

interface UpsertSymptomModalProps {
  opened: boolean;
  onClose: () => void;
  type: "Create" | "Update";
  initialValues?: Symptom;
}

const UpsertSymptomModal: FC<UpsertSymptomModalProps> = ({
  opened,
  onClose,
  type = "Create",
  initialValues,
}) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: upsertSymptom } = useUpsertSymptomMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getSymptomsQuerykey] });
      enqueueSnackbar({
        message: "Success: Symptom successfully created.",
        variant: "success",
      });
    },
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        code: initialValues?.code || "",
        name: initialValues?.name || "",
        question: initialValues?.question || "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required(),
        question: Yup.string().required(),
      })}
      onSubmit={async (values, { resetForm }) => {
        await upsertSymptom(values);
        onClose();
        resetForm();
      }}
    >
      {({ errors, getFieldProps, touched, handleSubmit, isSubmitting }) => (
        <Dialog
          open={opened}
          onClose={() => {
            onClose();
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{type} Symptom</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField
                {...getFieldProps("name")}
                variant="standard"
                label="Name"
                error={Boolean(touched.name && errors.name)}
                helperText={errors.name}
              />
              <TextField
                {...getFieldProps("question")}
                variant="standard"
                label="question"
                error={Boolean(touched.question && errors.question)}
                helperText={errors.question}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <LoadingButton
              onClick={() => handleSubmit()}
              loading={isSubmitting}
            >
              {type}
            </LoadingButton>
          </DialogActions>{" "}
        </Dialog>
      )}
    </Formik>
  );
};

export default UpsertSymptomModal;
