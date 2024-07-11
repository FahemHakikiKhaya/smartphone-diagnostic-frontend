"use client";

import { Password } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRegisterMutation } from "@/features/auth/api/useRegisterMutation";
import { useLoginMutation } from "@/features/auth/api/useLoginMutation";
import { User } from "@/features/user/type";

interface AuthContextType {
  authenticate: (type: "Register" | "Login") => void;
  logout: () => void;
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  authenticate: () => {},
  logout: () => {},
  user: null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authModal, setAuthModal] = useState<{ opened: boolean; type: string }>(
    { opened: false, type: "" }
  );

  const [user, setUser] = useState<User | null>(null);

  const { mutateAsync: register } = useRegisterMutation({
    onSuccess: (data) => {
      localStorage.setItem("auth-detective", JSON.stringify(data));
      setUser(data);
      setAuthModal({ ...authModal, opened: false });
    },
  });

  const { mutateAsync: login } = useLoginMutation({
    onSuccess: (data) => {
      localStorage.setItem("auth-detective", JSON.stringify(data));
      setUser(data);
      setAuthModal({ ...authModal, opened: false });
    },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("auth-detective");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const { getFieldProps, touched, errors, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      email: "",
      password: "",
      isRegister: authModal.type === "Register" || false,
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().when("isRegister", ([isRegister], schema) => {
        return isRegister
          ? schema.required("Username is required")
          : schema.notRequired();
      }),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      if (authModal.type === "Register") {
        await register({
          username: values.username,
          email: values.email,
          password: values.password,
        });
      }
      if (authModal.type === "Login") {
        await login({
          email: values.email,
          password: values.password,
        });
      }
    },
  });

  const authenticate = (type: "Register" | "Login") => {
    setAuthModal({ opened: true, type });
  };

  const logout = () => {
    localStorage.removeItem("auth-detective");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticate, user, logout }}>
      <Dialog
        open={authModal.opened}
        onClose={() => setAuthModal({ ...authModal, opened: false })}
        PaperProps={{
          sx: {
            backgroundColor: "primary",
            backgroundImage: "none",
            boxShadow: "none",
          },
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>{authModal.type}</DialogTitle>
        <DialogContent>
          <Stack spacing={{ md: 2 }}>
            {authModal.type === "Register" && (
              <TextField
                error={Boolean(touched.username && errors.username)}
                helperText={errors.username}
                placeholder="Username"
                {...getFieldProps("username")}
              />
            )}
            <TextField
              error={Boolean(touched.email && errors.email)}
              helperText={errors.email}
              placeholder="Email"
              {...getFieldProps("email")}
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              helperText={errors.password}
              placeholder="Password"
              type="password"
              {...getFieldProps("password")}
            />
          </Stack>
          <Stack direction="row" justifyContent="end" spacing={1} mt={3}>
            <LoadingButton variant="outlined" size="large" color="primary">
              Cancel
            </LoadingButton>
            <LoadingButton
              variant="contained"
              size="large"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </LoadingButton>
          </Stack>
        </DialogContent>
      </Dialog>

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { authenticate, user, logout } = useContext(AuthContext);
  return { authenticate, user, logout };
};
