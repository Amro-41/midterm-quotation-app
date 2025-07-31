// App.jsx
import { useState, useRef } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Paper,
  Box
} from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);
  const [selectedCode, setSelectedCode] = useState(products[0].code);

  const addItem = () => {
    let selected = products.find((v) => itemRef.current.value === v.code);

    const newItem = {
      item: selected.name,
      ppu: parseFloat(ppuRef.current.value),
      qty: parseInt(qtyRef.current.value),
      discount: parseFloat(discountRef.current.value) || 0,
    };

    // Merge if item name and ppu match
    let updated = [...dataItems];
    const existingIndex = updated.findIndex(
      (i) => i.item === newItem.item && i.ppu === newItem.ppu
    );

    if (existingIndex !== -1) {
      updated[existingIndex].qty += newItem.qty;
      updated[existingIndex].discount += newItem.discount;
    } else {
      updated.push(newItem);
    }

    setDataItems(updated);
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = (e) => {
    const code = e.target.value;
    setSelectedCode(code);
    let item = products.find((v) => v.code === code);
    setPpu(item.price);
  };

  const clearItems = () => setDataItems([]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Quotation Builder
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Item"
              value={selectedCode}
              inputRef={itemRef}
              onChange={productChange}
            >
              {products.map((p) => (
                <MenuItem key={p.code} value={p.code}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Price Per Unit"
              type="number"
              fullWidth
              inputRef={ppuRef}
              value={ppu}
              onChange={(e) => setPpu(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              type="number"
              defaultValue={1}
              fullWidth
              inputRef={qtyRef}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Discount"
              type="number"
              defaultValue={0}
              fullWidth
              inputRef={discountRef}
            />
          </Grid>

          <Grid item xs={12} display="flex" gap={2}>
            <Button variant="contained" color="primary" onClick={addItem}>
              Add
            </Button>
            <Button variant="outlined" color="error" onClick={clearItems}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box mt={4}>
        <QuotationTable data={dataItems} deleteByIndex={deleteByIndex} />
      </Box>
    </Container>
  );
}

export default App;
