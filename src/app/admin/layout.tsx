"use client";

import Sidebar from "@/features/admin/components/sidebar";
import { Box, Container } from "@mui/material";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openNav, setOpenNav] = useState<boolean>(true);

  return (
    <Box
      sx={{
        minHeight: 1,
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Sidebar openNav={openNav} onCloseNav={() => setOpenNav(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container sx={{ pt: 3 }}>{children}</Container>
      </Box>
    </Box>
  );
}
