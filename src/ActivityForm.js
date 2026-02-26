import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper
} from "@mui/material";

function ActivityForm() {

  const token = localStorage.getItem("token");

  const [activities, setActivities] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editId, setEditId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "clean",
    difficulty: "easy",
    ageGroup: "5-7",
    duration: 10,
    isActive: true
  });

  /* ================= LOAD ACTIVITIES ================= */
  const loadActivities = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/activity",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActivities(res.data.activities);
    } catch (err) {
      console.log("Load error:", err);
    }
  }, [token]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  /* ================= HANDLE INPUT ================= */
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }

  /* ================= CONFIRM ================= */
  function confirmAction(type) {
    setActionType(type);
    setOpenDialog(true);
  }

  async function handleConfirmedAction() {
    try {

      if (actionType === "insert") {
        await axios.post(
          "http://localhost:5000/api/activity",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (actionType === "update") {
        await axios.put(
          `http://localhost:5000/api/activity/${editId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (actionType === "delete") {
        await axios.delete(
          `http://localhost:5000/api/activity/${editId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      resetForm();
      loadActivities();

    } catch (err) {
      console.log("Operation error:", err);
    }

    setOpenDialog(false);
  }

  function resetForm() {
    setEditId(null);
    setFormData({
      title: "",
      description: "",
      category: "clean",
      difficulty: "easy",
      ageGroup: "5-7",
      duration: 10,
      isActive: true
    });
  }

  /* ================= SEARCH FILTER ================= */
  const filteredActivities = activities.filter(a =>
    a._id.includes(searchText) ||
    a.title.toLowerCase().includes(searchText.toLowerCase()) ||
    a.category.toLowerCase().includes(searchText.toLowerCase())
  );

  /* ================= GRID COLUMNS ================= */
  const columns = [
    { field: "_id", headerName: "ID", width: 180 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "difficulty", headerName: "Difficulty", flex: 1 },
    { field: "ageGroup", headerName: "Age Group", flex: 1 },
    { field: "duration", headerName: "Duration (min)", flex: 1 },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      renderCell: (params) =>
        params.value ? "Yes" : "No"
    }
  ];

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>

      <h2>Therapy Activity Management</h2>

      {/* ================= SEARCH ================= */}
      <TextField
        label="Search by ID / Title / Category"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "25px" }}
      />

      {/* ================= FORM ================= */}
      <Paper style={{ padding: "20px", marginBottom: "30px" }}>

        <TextField
          fullWidth
          label="Activity Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{ marginBottom: "15px" }}
        />

        {/* MULTILINE DESCRIPTION */}
        <TextField
          fullWidth
          label="Activity Description"
          name="description"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
          style={{ marginBottom: "15px" }}
        />

        <Select
          fullWidth
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ marginBottom: "15px" }}
        >
          <MenuItem value="clean">Clean & Messy</MenuItem>
          <MenuItem value="money">Money Learning</MenuItem>
        </Select>

        <Select
          fullWidth
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          style={{ marginBottom: "15px" }}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>

        <Select
          fullWidth
          name="ageGroup"
          value={formData.ageGroup}
          onChange={handleChange}
          style={{ marginBottom: "15px" }}
        >
          <MenuItem value="5-7">5-7</MenuItem>
          <MenuItem value="8-10">8-10</MenuItem>
          <MenuItem value="11-13">11-13</MenuItem>
        </Select>

        <TextField
          fullWidth
          type="number"
          label="Duration (minutes)"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          style={{ marginBottom: "15px" }}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
          }
          label="Active"
        />

        <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            onClick={() => confirmAction(editId ? "update" : "insert")}
          >
            {editId ? "Update" : "Insert"}
          </Button>

          <Button
            variant="outlined"
            color="error"
            disabled={!editId}
            onClick={() => confirmAction("delete")}
          >
            Delete
          </Button>

          <Button variant="text" onClick={resetForm}>
            Clear
          </Button>
        </div>

      </Paper>

      {/* ================= GRID ================= */}
      <div style={{ height: 400 }}>
        <DataGrid
          rows={filteredActivities}
          columns={columns}
          getRowId={(row) => row._id}
          onRowClick={(params) => {
            setEditId(params.row._id);
            setFormData(params.row);
          }}
        />
      </div>

      {/* ================= CONFIRM DIALOG ================= */}
      <Dialog open={openDialog}>
        <DialogTitle>Confirm Operation</DialogTitle>
        <DialogContent>
          Are you sure you want to continue?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmedAction}>OK</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default ActivityForm;