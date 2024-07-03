import { useCreateDiagnoseMutation } from "@/features/diagnose/api/useCreateDiagnoseMutation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { FC } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface UpsertDiagnoseModalProps {
  opened: boolean;
  onClose: () => void;
  type: "Create" | "Update";
}

const UpsertDiagnoseModal: FC<UpsertDiagnoseModalProps> = ({
  opened,
  onClose,
  type = "Create",
}) => {
  const { mutate: createDiagnose } = useCreateDiagnoseMutation({
    onSuccess: () => toast.success("Diagnose Successfuly Created"),
  });
  return (
    <Formik
      initialValues={{ name: "", solution: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required(),
        solution: Yup.string().required(),
      })}
      onSubmit={(values) => createDiagnose(values)}
    >
      {({ errors, getFieldProps, touched, handleSubmit }) => (
        <Dialog open={opened} onClose={onClose} maxWidth="sm" fullWidth>
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
            <Button onClick={() => handleSubmit()}>{type}</Button>
          </DialogActions>{" "}
        </Dialog>
      )}
    </Formik>
  );
};

export default UpsertDiagnoseModal;
