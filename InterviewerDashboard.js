/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InterviewerDashboard = () => {
  const [interviewRounds, setInterviewRounds] = useState([]); // ✅ Now defined

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const interviewerId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        const res = await axios.get(`http://localhost:5000/interviewer/${interviewerId}/rounds`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInterviewRounds(res.data); // ✅ No error now
      } catch (err) {
        console.error('Error fetching rounds:', err);
      }
    };

    fetchRounds();
  }, []);

  const handleStatusChange = async (roundId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!roundId) {
        console.error('Invalid round ID');
        return;
      }

      // API call to update status
      await axios.put(
        `http://localhost:5000/interviewer/rounds/${roundId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state after successful status change
      setInterviewRounds((prevRounds) =>
        prevRounds.map((round) =>
          round.round_id === roundId ? { ...round, status: newStatus } : round
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div>
      <h2>Interviewer Dashboard</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Position</th>
            <th>Round Number</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {interviewRounds.length === 0 ? (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          ) : (
            interviewRounds.map((round, index) => (
              <tr key={index}>
                <td>{round.CandidateName}</td>
                <td>{round.Position}</td>
                <td>{round.Round_ID}</td>
                <td>{round.Status}</td>
                <td>
                  <select
                    value={round.status}
                    onChange={(e) =>
                      handleStatusChange(round.round_id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Pass">Pass</option>
                    <option value="Fail">Fail</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewerDashboard;
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress
} from '@mui/material';

const InterviewerDashboard = () => {
  const [interviewRounds, setInterviewRounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const interviewerId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        const res = await axios.get(`http://localhost:5000/interviewer/${interviewerId}/rounds`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInterviewRounds(res.data);
      } catch (err) {
        console.error('Error fetching rounds:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRounds();
  }, []);

  const handleStatusChange = async (roundId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!roundId) {
        console.error('Invalid round ID');
        return;
      }

      await axios.put(
        `http://localhost:5000/interviewer/rounds/${roundId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterviewRounds((prevRounds) =>
        prevRounds.map((round) =>
          round.Round_ID === roundId ? { ...round, Status: newStatus } : round
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Interviewer Dashboard</Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Candidate Name</strong></TableCell>
                <TableCell><strong>Position</strong></TableCell>
                <TableCell><strong>Round Number</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Change Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interviewRounds.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">No data available</TableCell>
                </TableRow>
              ) : (
                interviewRounds.map((round, index) => (
                  <TableRow key={index}>
                    <TableCell>{round.CandidateName}</TableCell>
                    <TableCell>{round.Position}</TableCell>
                    <TableCell>{round.Round_Number}</TableCell>
                    <TableCell>{round.Status}</TableCell>
                    <TableCell>
                      <FormControl fullWidth variant="standard">
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={round.Status || ''}
                          onChange={(e) => handleStatusChange(round.Round_ID, e.target.value)}
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Pass">Pass</MenuItem>
                          <MenuItem value="Fail">Fail</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default InterviewerDashboard;
