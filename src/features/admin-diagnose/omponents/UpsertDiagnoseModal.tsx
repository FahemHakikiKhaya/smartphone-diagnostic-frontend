"use client";

import { useUpsertDiagnoseMutation } from "@/features/diagnose/api/useUpsertDiagnoseMutation";
import { getDiagnosesQuerykey } from "@/features/diagnose/api/useGetDiagnosesQuery";
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
import { Diagnose } from "@/features/diagnose/types";

interface UpsertDiagnoseModalProps {
  opened: boolean;
  onClose: () => void;
  type: "Create" | "Update";
  initialValues?: Diagnose;
}

const UpsertDiagnoseModal: FC<UpsertDiagnoseModalProps> = ({
  opened,
  onClose,
  type = "Create",
  initialValues,
}) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: upsertDiagnose } = useUpsertDiagnoseMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getDiagnosesQuerykey] });
      enqueueSnackbar({
        message: "Success: Diagnose successfully created.",
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
        description: initialValues?.description || "",
        solution: initialValues?.solution || "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required(),
        solution: Yup.string().required(),
      })}
      onSubmit={async (values, { resetForm }) => {
        await upsertDiagnose(values);
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
          <DialogTitle>{type} Diagnose</DialogTitle>
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
                {...getFieldProps("description")}
                variant="standard"
                label="Description"
                error={Boolean(touched.description && errors.description)}
                helperText={errors.description}
              />
              <TextField
                {...getFieldProps("solution")}
                variant="standard"
                label="Solution"
                error={Boolean(touched.solution && errors.solution)}
                helperText={errors.solution}
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

export default UpsertDiagnoseModal;
