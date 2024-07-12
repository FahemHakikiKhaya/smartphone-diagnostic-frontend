import { TableRow, Checkbox, TableCell, TableHead } from "@mui/material";

interface HeadLabel {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  width?: number | string;
  minWidth?: number | string;
}

interface DiagnoseTableHeadProps {
  rowCount: number;
  headLabel: HeadLabel[];
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DiagnoseTableHead: React.FC<DiagnoseTableHeadProps> = ({
  rowCount,
  headLabel,
  numSelected,
  onSelectAllClick,
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>

        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align || "left"}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default DiagnoseTableHead;
