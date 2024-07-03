import { useState, MouseEvent, useMemo } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

// import Label from "src/components/label";
// import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

interface UserTableRowProps {
  handleClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ handleClick }) => {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const { selected, name, avatarUrl, company, role, isVerified, status } =
    useMemo(() => {
      return {
        selected: "test",
        name: "test",
        avatarUrl: "test",
        company: "test",
        role: "test",
        isVerified: "test",
        status: "test",
      };
    }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{company}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align="center">{isVerified ? "Yes" : "No"}</TableCell>

        <TableCell>
          {/* <Label color={(status === "banned" && "error") || "success"}>
            {status}
          </Label> */}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            {/* <Iconify icon="eva:more-vertical-fill" /> */}
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          {/* <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} /> */}
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          {/* <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} /> */}
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};

export default UserTableRow;
