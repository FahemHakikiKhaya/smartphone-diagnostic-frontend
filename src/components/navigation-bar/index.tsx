"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const path = usePathname();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Stack
      width="100%"
      position="fixed"
      py={2}
      zIndex={100}
      sx={{
        backgroundColor: scrolled ? "#121212" : "transparent",
        ...(scrolled ? { borderBottom: "1px solid grey" } : {}),
        display: path.includes("/admin") ? "none" : "block",
      }}
    >
      <Container>
        <Stack direction="row" justifyContent="space-between">
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Image
                src="/icon.png"
                width={30}
                height={30}
                alt="logo"
                style={{
                  borderRadius: "8px",
                  border: "0.1px solid grey",
                }}
              />
              <Typography fontSize={25} fontWeight={600}>
                Detective
              </Typography>
            </Stack>
          </Link>
          <Button variant="contained" color="primary" size="medium">
            Login
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};

export default NavigationBar;
