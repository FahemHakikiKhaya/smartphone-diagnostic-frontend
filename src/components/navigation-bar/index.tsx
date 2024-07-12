"use client";

import {
  Avatar,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/provider/AuthProvider";

function stringAvatar(name: string) {
  return {
    sx: {
      backgroundColor: "white",
    },
    children: name.split("")[0],
  };
}

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const path = usePathname();
  const { authenticate, user, logout } = useAuth();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          {user ? (
            <Avatar
              {...stringAvatar(user.username)}
              onClick={(e) => handleClick(e)}
            />
          ) : (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                onClick={() => authenticate("Register")}
              >
                Register
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={() => authenticate("Login")}
              >
                Login
              </Button>
            </Stack>
          )}
        </Stack>

        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: -10,
            horizontal: "center",
          }}
        >
          {user?.isAdmin && (
            <MenuItem
              onClick={() => {
                router.push("/admin");
                handleClose();
              }}
            >
              Dashboard
            </MenuItem>
          )}
          <MenuItem onClick={handleClose}>Results</MenuItem>
          <MenuItem
            onClick={() => {
              logout();
              handleClose();
            }}
          >
            Log Out
          </MenuItem>
        </Menu>
      </Container>
    </Stack>
  );
};

export default NavigationBar;
