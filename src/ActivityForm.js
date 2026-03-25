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

function ActivityForm({ setPage }) {
  
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
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>

       <div className="top-nav" style={{ marginBottom: '25px' }}>
          <button
            className="back-btn"
            onClick={() => setPage("dashboard")}
            style={{ padding: '10px 20px', borderRadius: '15px', color: 'var(--text-primary)', border: '2px solid var(--border-color)' }}
          >
            ← Back to Dashboard
          </button>
        </div>

      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '10px' }}>Therapy Activity Management</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Comprehensive management of specialized learning modules.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px', alignItems: 'start' }}>
        
        {/* ================= FORM SIDE ================= */}
        <Paper elevation={0} style={{ padding: "35px", borderRadius: '28px', background: 'var(--card-bg)', border: '2px solid var(--border-color)', backdropFilter: 'blur(16px)' }}>
          <div style={{ marginBottom: '25px' }}></div>
          
          <TextField
            fullWidth
            label="Activity Title"
            name="title"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            style={{ marginBottom: "20px" }}
            InputLabelProps={{ style: { color: 'var(--text-primary)' } }}
            InputProps={{ style: { color: 'var(--text-primary)' } }}
          />

          <TextField
            fullWidth
            label="Activity Description"
            name="description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
            style={{ marginBottom: "20px" }}
            InputLabelProps={{ style: { color: 'var(--text-primary)' } }}
            InputProps={{ style: { color: 'var(--text-primary)' } }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <Select
              fullWidth
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-color)' } }}
            >
              <MenuItem value="clean">Clean & Messy</MenuItem>
              <MenuItem value="money">Money Learning</MenuItem>
            </Select>

            <Select
              fullWidth
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              style={{ color: 'var(--text-primary)' }}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-color)' } }}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <Select
              fullWidth
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
              style={{ color: 'var(--text-primary)' }}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-color)' } }}
            >
              <MenuItem value="5-7">Age: 5-7</MenuItem>
              <MenuItem value="8-10">Age: 8-10</MenuItem>
              <MenuItem value="11-13">Age: 11-13</MenuItem>
            </Select>

            <TextField
              fullWidth
              type="number"
              label="Duration (min)"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'var(--text-primary)' } }}
              InputProps={{ style: { color: 'var(--text-primary)' } }}
            />
          </div>

          <FormControlLabel
            control={
              <Checkbox
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                style={{ color: '#4facfe' }}
              />
            }
            label="Activity is Active"
            style={{ marginBottom: '15px', color: 'var(--text-primary)' }}
          />

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => confirmAction(editId ? "update" : "insert")}
              style={{ padding: '15px', borderRadius: '15px', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', fontWeight: 'bold', color: 'white' }}
            >
              {editId ? "Save Changes" : "Insert Activity"}
            </Button>

            {editId && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => confirmAction("delete")}
                style={{ borderRadius: '15px', fontWeight: 'bold', border: '2px solid' }}
              >
                Delete
              </Button>
            )}
          </div>
          
          <Button variant="text" fullWidth onClick={resetForm} style={{ marginTop: '15px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
            Reset Form
          </Button>
        </Paper>

        {/* ================= TABLE SIDE ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            label="🔍 Search Live Database"
            fullWidth
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ background: 'var(--card-bg)', borderRadius: '15px' }}
            InputLabelProps={{ style: { color: 'var(--text-primary)' } }}
            InputProps={{ style: { color: 'var(--text-primary)', borderRadius: '15px' } }}
          />

          <div style={{ height: 550, width: '100%', background: 'transparent', borderRadius: '28px', overflow: 'hidden', border: '2px solid var(--border-color)', backdropFilter: 'blur(10px)' }}>
            <DataGrid
              rows={filteredActivities}
              columns={columns}
              getRowId={(row) => row._id}
              onRowClick={(params) => {
                setEditId(params.row._id);
                setFormData(params.row);
              }}
              sx={{
                border: 0,
                color: 'var(--text-primary)',
                '& .MuiDataGrid-main': { background: 'var(--card-bg)' },
                '& .MuiDataGrid-cell': { borderBottom: '1px solid var(--border-color)', fontWeight: '500', color: 'var(--text-primary)' },
                '& .MuiDataGrid-cell:hover': { color: '#4facfe', cursor: 'pointer' },
                '& .MuiDataGrid-columnHeaders': { background: 'rgba(255,255,255,0.05)', fontWeight: '900', color: 'var(--text-primary)', borderBottom: '2px solid var(--border-color)' },
                '& .MuiDataGrid-virtualScroller': { background: 'transparent' },
                '& .MuiDataGrid-footerContainer': { background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', borderTop: '1px solid var(--border-color)' },
                '& .MuiTablePagination-root': { color: 'var(--text-primary)' },
                '& .MuiDataGrid-columnSeparator': { display: 'none' },
                '& .MuiDataGrid-row:hover': { background: 'rgba(255,255,255,0.03) !important' }
              }}
            />
          </div>
        </div>

      </div>

      {/* ================= CONFIRM DIALOG ================= */}
      <Dialog open={openDialog} PaperProps={{ style: { borderRadius: '20px', padding: '10px' } }}>
        <DialogTitle style={{ fontWeight: 'bold' }}>Confirm Operation</DialogTitle>
        <DialogContent>
          Are you sure you want to perform this action? This will update your live learning database.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} style={{ color: 'var(--text-secondary)' }}>Cancel</Button>
          <Button onClick={handleConfirmedAction} variant="contained" style={{ borderRadius: '10px', background: '#00f2fe', color: 'black', fontWeight: 'bold' }}>Confirm</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default ActivityForm;