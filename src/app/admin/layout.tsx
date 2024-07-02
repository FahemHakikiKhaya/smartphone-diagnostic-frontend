"use client";

import Sidebar from "@/features/admin/components/sidebar";
import { Box } from "@mui/material";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openNav, setOpenNav] = useState<boolean>(false);

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
          //   py: `${HEADER.H_MOBILE + SPACING}px`,
          //   ...(lgUp && {
          //     px: 2,
          //     py: `${HEADER.H_DESKTOP + SPACING}px`,
          //     width: `calc(100% - ${NAV.WIDTH}px)`,
          //   }),
          //   ...sx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
