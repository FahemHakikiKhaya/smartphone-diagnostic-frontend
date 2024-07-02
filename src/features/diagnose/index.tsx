"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DiagnosePage() {
  const [scaleX, setScaleX] = useState<number>(0);

  return (
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
          <Stack>
            <Typography
              fontSize={{ md: "22px" }}
              fontWeight={{ md: 800 }}
              mb={4}
            >
              Is your phone battery draining faster than usual?
            </Typography>
            <Stack width="100%" spacing={3}>
              <Typography
                component={motion.div}
                whileHover={{ y: -8, borderColor: "white" }}
                transition={{ duration: 0.3 }}
                sx={{
                  borderColor: "action.disabled",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: 2,
                  p: 1.5,
                  cursor: "pointer",
                }}
              >
                Yes
              </Typography>
              <Typography
                component={motion.div}
                whileHover={{ y: -8, borderColor: "white" }}
                transition={{ duration: 0.3 }}
                sx={{
                  borderColor: "action.disabled",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: 2,
                  p: 1.5,
                  cursor: "pointer",
                }}
              >
                No
              </Typography>
            </Stack>
            <Stack direction="row" mt={4} justifyContent="end" spacing={2}>
              <Button
                size="large"
                color="primary"
                variant="outlined"
                sx={{ width: "fit-content" }}
              >
                Previous
              </Button>
              <Button
                size="large"
                color="primary"
                variant="contained"
                sx={{ width: "fit-content" }}
                onClick={() => setScaleX(scaleX + 0.1)}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
