/*
// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overviewRes, usersRes] = await Promise.all([
          axios.get('http://localhost:5000/admin/overview', {
            headers: { Authorization: token }
          }),
          axios.get('http://localhost:5000/admin/users', {
            headers: { Authorization: token }
          })
        ]);
        setStats(overviewRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {loading ? <p>Loading...</p> : (
        <>
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Candidates: {stats.totalCandidates}</p>
          <p>Total Interviewers: {stats.totalInterviewers}</p>
          <p>Total Assets: {stats.totalAssets}</p>

          <h3>User List</h3>
          <ul>
            {users.length ? users.map(user => (
              <li key={user.User_ID}>{user.Name} - {user.Role}</li>
            )) : <p>No users found.</p>}
          </ul>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
*/

// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const StatCard = ({ label, value }) => (
  <Card elevation={3} sx={{ minWidth: 200, borderRadius: 2 }}>
    <CardContent>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overviewRes, usersRes] = await Promise.all([
          axios.get('http://localhost:5000/admin/overview', {
            headers: { Authorization: token }
          }),
          axios.get('http://localhost:5000/admin/users', {
            headers: { Authorization: token }
          })
        ]);
        setStats(overviewRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard label="Total Users" value={stats.totalUsers} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard label="Total Candidates" value={stats.totalCandidates} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard label="Total Interviewers" value={stats.totalInterviewers} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard label="Total Assets" value={stats.totalAssets} />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            User List
          </Typography>

          {users.length ? (
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Role</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.User_ID}>
                      <TableCell>{user.User_ID}</TableCell>
                      <TableCell>{user.Name}</TableCell>
                      <TableCell>{user.Email}</TableCell>
                      <TableCell>{user.Role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1">No users found.</Typography>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
