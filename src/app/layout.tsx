import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Box, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import { NotistackProvider } from "@/provider/NotiStackProvider";
import NavigationBar from "@/components/navigation-bar";
import { AuthProvider } from "@/provider/AuthProvider";

export const metadata: Metadata = {
  title: "Detective",
  description: "Smartphone Diagnostic App",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ReactQueryProvider>
              <NotistackProvider
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
                autoHideDuration={3000}
              >
                <AuthProvider>
                  <CssBaseline />
                  <Box position="relative">
                    <NavigationBar />
                    {children}
                  </Box>
                </AuthProvider>
              </NotistackProvider>
            </ReactQueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
