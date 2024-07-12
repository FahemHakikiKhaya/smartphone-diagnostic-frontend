import { useState, MouseEvent } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Diagnose } from "@/features/diagnose/types";
import { Delete, Edit, Healing, MoreVert } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface DiagnoseTableRowProps {
  diagnose: Diagnose;
  handleClick: (id: number) => void;
  selected: boolean;
  setUpsertModal: ({
    opened,
    selectedId,
  }: {
    opened: boolean;
    selectedId: number;
  }) => void;
  deleteDiagnoses: (ids: number[]) => void;
}

const DiagnoseTableRow: React.FC<DiagnoseTableRowProps> = ({
  handleClick,
  diagnose,
  selected,
  setUpsertModal,
  deleteDiagnoses,
}) => {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const router = useRouter();

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const { id, code, name, solution, description } = diagnose || {};

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox
            disableRipple
            checked={selected}
            onChange={() => handleClick(id)}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="subtitle2">{code}</Typography>
        </TableCell>

        <TableCell component="th" scope="row">
          <Typography variant="subtitle2">{name}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="subtitle2">{description}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="subtitle2">{solution}</Typography>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <MoreVert />
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
        <MenuItem
          onClick={() => {
            setUpsertModal({ opened: true, selectedId: id });
            handleCloseMenu();
          }}
          sx={{ py: 1 }}
        >
          <Edit sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(`/admin/diagnose/${id}`);
            handleCloseMenu();
          }}
          sx={{ py: 1 }}
        >
          <Healing sx={{ mr: 1 }} />
          Symptoms
        </MenuItem>

        <MenuItem
          onClick={() => {
            deleteDiagnoses([id]);
            handleCloseMenu();
          }}
          sx={{ color: "error.main", py: 1 }}
        >
          <Delete sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};

export default DiagnoseTableRow;
