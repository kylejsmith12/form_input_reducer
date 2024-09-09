import React, { useReducer, useState } from "react";
import { Grid2, Select, MenuItem, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check"; // To show a "Save" icon when editing
import RowDisplay from "./RowDisplay";

const initialState = {
  rows: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ROW":
      return { ...state, rows: [...state.rows, action.payload] };
    case "EDIT_ROW":
      return {
        ...state,
        rows: state.rows.map((row, index) =>
          index === action.index ? { ...row, ...action.payload } : row
        ),
      };
    case "DELETE_ROW":
      return {
        ...state,
        rows: state.rows.filter((_, index) => index !== action.index),
      };
    default:
      return state;
  }
}

const FormGrid = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formData, setFormData] = useState({
    select1: "",
    select2: "",
    multiSelect: [],
    numberInput: 1,
    coordinateInput: "",
    select3: "",
    select4: "",
  });
  const [editingRow, setEditingRow] = useState(null);

  const mockOptions1 = ["Option 1", "Option 2", "Option 3"];
  const mockOptions2 = ["Option A", "Option B", "Option C"];
  const mockMultiSelectOptions = ["Multi 1", "Multi 2", "Multi 3"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addRow = () => {
    if (editingRow !== null) {
      dispatch({ type: "EDIT_ROW", index: editingRow, payload: formData });
      setEditingRow(null); // Exit editing mode
    } else {
      dispatch({ type: "ADD_ROW", payload: formData });
    }
    setFormData({
      select1: "",
      select2: "",
      multiSelect: [],
      numberInput: 1,
      coordinateInput: "",
      select3: "",
      select4: "",
    });
  };

  const startEditing = (index) => {
    setEditingRow(index);
    setFormData(state.rows[index]);
  };

  return (
    <>
      <RowDisplay
        rows={state.rows}
        editingRow={editingRow}
        setEditingRow={setEditingRow}
        startEditing={startEditing}
        saveEdit={addRow} // Save and addRow now handle both cases
        dispatch={dispatch}
      />
      {/* Grid2 Form */}
      <Grid2 container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid2 item xs={1}></Grid2>
        <Grid2 item xs={2}>
          <Select
            fullWidth
            value={formData.select1}
            name="select1"
            onChange={handleInputChange}
          >
            {mockOptions1.map((option, idx) => (
              <MenuItem key={idx} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid2>
        <Grid2 item xs={2}>
          <Select
            fullWidth
            value={formData.select2}
            name="select2"
            onChange={handleInputChange}
          >
            {mockOptions2.map((option, idx) => (
              <MenuItem key={idx} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid2>
        <Grid2 item xs={2}>
          <Select
            multiple
            fullWidth
            value={formData.multiSelect}
            name="multiSelect"
            onChange={handleInputChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {mockMultiSelectOptions.map((option, idx) => (
              <MenuItem key={idx} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid2>
        <Grid2 item xs={1}>
          <TextField
            fullWidth
            type="number"
            name="numberInput"
            value={formData.numberInput}
            inputProps={{ min: 1 }}
            onChange={handleInputChange}
          />
        </Grid2>
        <Grid2 item xs={2}>
          <TextField
            fullWidth
            name="coordinateInput"
            value={formData.coordinateInput}
            onChange={handleInputChange}
            placeholder="(1).(2)A3.(4)B"
          />
        </Grid2>
        <Grid2 item xs={1}>
          <Select
            fullWidth
            value={formData.select3}
            name="select3"
            onChange={handleInputChange}
          >
            {mockOptions1.map((option, idx) => (
              <MenuItem key={idx} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid2>
        <Grid2 item xs={1}>
          <Select
            fullWidth
            value={formData.select4}
            name="select4"
            onChange={handleInputChange}
          >
            {mockOptions2.map((option, idx) => (
              <MenuItem key={idx} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid2>
        <Grid2 item xs={1}>
          <IconButton onClick={addRow}>
            {editingRow !== null ? <CheckIcon /> : <AddIcon />}
          </IconButton>
        </Grid2>
      </Grid2>

      {/* Rows Display */}
    </>
  );
};

export default FormGrid;
