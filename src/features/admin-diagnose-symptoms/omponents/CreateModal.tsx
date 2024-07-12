"use client";

import { useUpsertDiagnoseMutation } from "@/features/diagnose/api/useUpsertDiagnoseMutation";
import { getDiagnosesQuerykey } from "@/features/diagnose/api/useGetDiagnosesQuery";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Popper,
  Stack,
  TextField,
} from "@mui/material";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { FC, useMemo, useState } from "react";
import * as Yup from "yup";
import { Diagnose } from "@/features/diagnose/types";
import { useCreateDiagnoseSymptomMutation } from "@/features/diagnose-symptom/api/useCreateDiagnoseSymptomMutation";
import { Symptom } from "@/features/symptom/type";
import { styled } from "@mui/material/styles";
import { getDiagnoseSymptomsQuerykey } from "@/features/diagnose-symptom/api/useGetDiagnoseSymptomsQuery";

interface CreateDiagnoseSymptomModalProps {
  opened: boolean;
  onClose: () => void;
  symptomOptions: Symptom[];
  diagnoseId: number;
}

interface SymptomOption {
  id: number;
  label: string;
}

interface FormValues {
  value: SymptomOption | null;
  inputValue: string;
}

const CustomPopper = styled(Popper)({
  zIndex: 100, // Ensure this is higher than the Dialog z-index
});

const CreateDiagnoseSymptomModal: FC<CreateDiagnoseSymptomModalProps> = ({
  opened,
  onClose,
  symptomOptions,
  diagnoseId,
}) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: createDiagnoseSymptom } =
    useCreateDiagnoseSymptomMutation({
      onError: (error: any) => {
        enqueueSnackbar({
          message: error.response.data.message,
          variant: "error",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [getDiagnoseSymptomsQuerykey],
        });
        enqueueSnackbar({
          message: "Success: Diagnose successfully created.",
          variant: "success",
        });
      },
    });

  const formattedSymptomOptions = useMemo(() => {
    return symptomOptions.map(({ id, name }) => ({
      label: name,
      id,
    }));
  }, [symptomOptions]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        value: null,
        inputValue: "",
        certaintyFactor: 0,
      }}
      validationSchema={Yup.object({
        // value: Yup.object().required(),
      })}
      onSubmit={async (values, { resetForm }) => {
        console.log(values);
        await createDiagnoseSymptom({
          diagnoseId,
          symptomId: (values.value as unknown as { id: number }).id,
          certaintyFactor: 0,
        });
        onClose();
        resetForm();
      }}
    >
      {({ handleSubmit, isSubmitting, setFieldValue, values }) => (
        <Dialog
          open={opened}
          onClose={() => {
            onClose();
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add Symptom</DialogTitle>
          <DialogContent>
            <Autocomplete
              sx={{ mt: 1 }}
              value={values.value}
              onChange={(_, newValue: SymptomOption | null) => {
                setFieldValue("value", newValue);
              }}
              inputValue={values.inputValue}
              onInputChange={(_, newInputValue: string) => {
                setFieldValue("inputValue", newInputValue);
              }}
              fullWidth
              options={formattedSymptomOptions}
              renderInput={(params) => (
                <TextField {...params} label="Symptoms" />
              )}
              PopperComponent={CustomPopper}
            />{" "}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <LoadingButton
              onClick={() => handleSubmit()}
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </DialogActions>{" "}
        </Dialog>
      )}
    </Formik>
  );
};

export default CreateDiagnoseSymptomModal;
