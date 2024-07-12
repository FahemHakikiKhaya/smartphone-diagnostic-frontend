import { useState, MouseEvent } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { DiagnoseSymptom } from "@/features/diagnose-symptom/type";

interface DiagnoseSymptomsTableRowProps {
  diagnoseSymptom: DiagnoseSymptom;
  handleClick: (id: number) => void;
  selected: boolean;
  setCreateModal: ({
    opened,
    selectedId,
  }: {
    opened: boolean;
    selectedId: number;
  }) => void;
  deleteDiagnoseSymptoms: (ids: number[]) => void;
}

const DiagnoseSymptomsTableRow: React.FC<DiagnoseSymptomsTableRowProps> = ({
  handleClick,
  diagnoseSymptom,
  selected,
  setCreateModal,
  deleteDiagnoseSymptoms,
}) => {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const { id, symptom } = diagnoseSymptom || {};

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
          <Typography variant="subtitle2">{symptom?.code}</Typography>
        </TableCell>

        <TableCell component="th" scope="row">
          <Typography variant="subtitle2">{symptom?.name}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="subtitle2">{symptom?.question}</Typography>
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
            deleteDiagnoseSymptoms([id]);
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

export default DiagnoseSymptomsTableRow;
