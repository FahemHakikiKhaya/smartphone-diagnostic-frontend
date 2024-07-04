import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import { Search, Delete } from "@mui/icons-material";

// ----------------------------------------------------------------------

interface DiagnoseTableToolbarProps {
  selectedIds: number[];
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (ids: number[]) => void;
}

const DiagnoseTableToolbar: React.FC<DiagnoseTableToolbarProps> = ({
  selectedIds,
  filterName,
  onFilterName,
  onDelete,
}) => {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: "flex",
        justifyContent: "space-between",
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(selectedIds?.length > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {selectedIds?.length > 0 ? (
        <Typography component="div" variant="subtitle1">
          {selectedIds?.length} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
      )}

      {selectedIds?.length > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={() => onDelete(selectedIds)}>
            <Delete />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default DiagnoseTableToolbar;
