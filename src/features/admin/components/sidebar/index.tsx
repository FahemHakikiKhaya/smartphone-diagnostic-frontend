import { ReactNode, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import Scrollbar from "@/components/scrollbar";
import navConfig from "@/configs/nav";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import { Breakpoints } from "@mui/system";
import { Person, Adb, Healing } from "@mui/icons-material";
import { useAuth } from "@/provider/AuthProvider";

interface NavProps {
  openNav: boolean;
  onCloseNav: () => void;
}

const navItemList = [
  {
    title: "user",
    path: "/",
    icon: <Person />,
  },
  {
    title: "diagnose",
    path: "/admin/diagnose",
    icon: <Adb />,
  },
  {
    title: "symptom",
    path: "/admin/symptom",
    icon: <Healing />,
  },
];

const account = {
  displayName: "Fahem Khakiki Khaya",
  photoURL:
    "https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_25.jpg",
  role: "admin",
};

export default function Sidebar({ openNav, onCloseNav }: NavProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const upLg = useMediaQuery(({ breakpoints }: { breakpoints: Breakpoints }) =>
    breakpoints.up("lg")
  );
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname, openNav, onCloseNav]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{user?.username}</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navItemList.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* <Logo sx={{ mt: 3, ml: 4 }} /> */}
      {renderAccount}
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: navConfig.layout.width },
      }}
    >
      {/* {upLg ? ( */}
      <Box
        sx={{
          height: 1,
          position: "fixed",
          width: navConfig.layout.width,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {renderContent}
      </Box>
      {/* ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: navConfig.layout.width,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )} */}
    </Box>
  );
}

interface NavItemProps {
  item: {
    title: string;
    path: string;
    icon: ReactNode;
  };
}

function NavItem({ item }: NavItemProps) {
  const pathname = usePathname();
  const active = item.path === pathname;

  return (
    <ListItemButton
      //   component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
}
