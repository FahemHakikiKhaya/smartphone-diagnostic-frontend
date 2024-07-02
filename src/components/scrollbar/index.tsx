import { memo, forwardRef, ReactNode } from "react";
import Box from "@mui/material/Box";
import { StyledScrollbar, StyledRootScrollbar } from "./styles";

interface ScrollbarProps {
  children: ReactNode;
  sx?: object;
  [key: string]: any;
}

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(function Scrollbar(
  { children, sx, ...other },
  ref
) {
  // Check if window is defined to determine if it's running on SSR
  const userAgent = typeof window !== "undefined" ? navigator.userAgent : "SSR";

  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (mobile) {
    return (
      <Box ref={ref} sx={{ overflow: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        scrollableNodeProps={{
          ref,
        }}
        clickOnTrack={false}
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
});

Scrollbar.displayName = "Scrollbar";

export default memo(Scrollbar);
