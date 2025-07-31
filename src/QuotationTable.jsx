// QuotationTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
  Box
} from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

function QuotationTable({ data, deleteByIndex }) {
  if (!data || data.length === 0) {
    return (
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Quotation
        </Typography>
        <Typography color="text.secondary">
          <CiShoppingCart /> No items
        </Typography>
      </Box>
    );
  }

  const totalDiscount = data.reduce((sum, item) => sum + item.discount, 0);
  const totalAmount = data.reduce(
    (sum, item) => sum + item.qty * item.ppu - item.discount,
    0
  );

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Quotation
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              const amount = v.qty * v.ppu - v.discount;

              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => deleteByIndex(i)}>
                      <BsFillTrashFill />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="center">{v.discount}</TableCell>
                  <TableCell align="right">{amount.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}

            {/* Total row */}
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell align="center"><strong>Total Discount</strong></TableCell>
              <TableCell align="right"><strong>{totalDiscount.toFixed(2)}</strong></TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} />
              <TableCell align="center"><strong>Final Total</strong></TableCell>
              <TableCell align="right"><strong>{totalAmount.toFixed(2)}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default QuotationTable;
