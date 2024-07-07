import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import { Search, Delete } from "@mui/icons-material";

// ----------------------------------------------------------------------

interface DiagnoseSymptomTableToolbarProps {
  selectedIds: number[];
  searchFilter: string;
  onSearchFilter: (value: string) => void;
  onDelete: (ids: number[]) => void;
}

const DiagnoseSymptomsTableToolbar: React.FC<
  DiagnoseSymptomTableToolbarProps
> = ({ selectedIds, searchFilter, onSearchFilter, onDelete }) => {
  const [searchInput, setSearchInput] = useState<string>("");
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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search symptoms..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchFilter(searchInput);
            }
          }}
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

export default DiagnoseSymptomsTableToolbar;
