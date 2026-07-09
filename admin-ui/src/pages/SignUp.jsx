import React, { useContext, useState } from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import FormSignUp from "../components/Fragments/FormSignUp";
import { registerService } from "../services/authService";
import { AuthContext } from "../context/authContext";
import AppSnackbar from "../components/Elements/AppSnackbar";

function SignUp() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRegister = async (name, email, password) => {
    try {
      const data = await registerService(name, email, password);
      setSnackbar({
        open: true,
        message: data.msg,
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.msg,
        severity: "error",
      });
    }
  };

  return (
    <>
      <AuthLayout title="Create an account">
        <FormSignUp onSubmit={handleRegister} />

        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </AuthLayout>
    </>
  );
}

export default SignUp;