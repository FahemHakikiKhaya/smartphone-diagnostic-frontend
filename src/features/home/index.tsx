"use client";

import useTypingEffect from "@/hooks/useTypingEffect";
import { useAuth } from "@/provider/AuthProvider";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const gridBackground = {
  backgroundImage:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
  backgroundSize: "50px 50px",
  height: "100vh",
  position: "relative" as "relative",
};

export default function HomePage() {
  const text = "iagnose Your Smartphone Issues Effortlessly";
  const displayedText = useTypingEffect(text);
  const { authenticate, user } = useAuth();
  const router = useRouter();

  const onClickGetStarted = () => {
    if (user) {
      router.push("/diagnose");
    } else {
      authenticate("Login");
    }
  };

  return (
    <Box sx={gridBackground}>
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
        <Stack
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          spacing={{ md: 5 }}
          height="100vh"
        >
          <Typography
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            sx={{
              fontSize: { md: "59px", xs: "20px" },
              fontWeight: { md: 800 },
            }}
          >
            D{displayedText}
          </Typography>
          <Typography
            sx={{ fontSize: { md: "22px" } }}
            maxWidth="750px"
            color="text.disabled"
          >
            <Typography
              sx={{ fontSize: { md: "22px" } }}
              maxWidth="750px"
              component="span"
              color="text.primary"
            >
              A smart diagnostic system
            </Typography>{" "}
            that uses a series of guided questions to help you identify the
            exact issue with your phone.
          </Typography>
          <Stack direction="row" spacing={{ md: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onClickGetStarted}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => toast.success("test")}
            >
              About Us
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
