import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Typography } from "@mui/material";

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);

  const columns = [
    { field: "Candidate_ID", headerName: "ID", width: 90 },
    { field: "Name", headerName: "Name", width: 200 },
    { field: "Email", headerName: "Email", width: 250 },
    { field: "Phone", headerName: "Phone", width: 150 },
    { field: "Status", headerName: "Status", width: 130 },
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/candidates").then((res) => {
      setCandidates(res.data);
    });
  }, []);

  return (
    <Paper sx={{ padding: 3, margin: 3 }}>
      <Typography variant="h5" gutterBottom>
        Candidates List
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={candidates.map((c) => ({ ...c, id: c.Candidate_ID }))}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </Paper>
  );
};

export default CandidatesList;
