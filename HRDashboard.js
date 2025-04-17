/*
// src/pages/HRDashboard.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const HRDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Address: '',
    Position_Applied: ''
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchCandidates = useCallback(() => {
    setLoading(true);
    axios.get('http://localhost:5000/hr/candidates', {
      headers: { Authorization: token }
    })
      .then(res => setCandidates(res.data))
      .catch(err => console.error('Error fetching candidates:', err))
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate(prev => ({ ...prev, [name]: value }));
  };

  const addCandidate = () => {
    if (!newCandidate.Name || !newCandidate.Email) {
      alert('Please fill in Name and Email');
      return;
    }

    axios.post('http://localhost:5000/addCandidate', newCandidate, {
      headers: { Authorization: token }
    })
      .then(() => {
        fetchCandidates();
        setNewCandidate({ Name: '', Email: '', Phone: '', Address: '', Position_Applied: '' });
      })
      .catch(err => console.error('Error adding candidate:', err));
  };

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  return (
    <div>
      <h2>HR Dashboard</h2>

      <h3>Add Candidate</h3>
      {['Name', 'Email', 'Phone', 'Address', 'Position_Applied'].map(field => (
        <input
          key={field}
          name={field}
          placeholder={field.replace('_', ' ')}
          value={newCandidate[field]}
          onChange={handleChange}
        />
      ))}
      <button onClick={addCandidate}>Add</button>

      <h3>Candidate List</h3>
      {loading ? <p>Loading...</p> : (
        <ul>
          {candidates.length ? candidates.map(c => (
            <li key={c.Candidate_ID}>{c.Name} - {c.Status}</li>
          )) : <p>No candidates found.</p>}
        </ul>
      )}
    </div>
  );
};

export default HRDashboard;

*/

/*
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Divider
} from '@mui/material';

const HRDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Address: '',
    Position_Applied: ''
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchCandidates = useCallback(() => {
    setLoading(true);
    axios.get('http://localhost:5000/hr/candidates', {
      headers: { Authorization: token }
    })
      .then(res => setCandidates(res.data))
      .catch(err => console.error('Error fetching candidates:', err))
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate(prev => ({ ...prev, [name]: value }));
  };

  const addCandidate = () => {
    if (!newCandidate.Name || !newCandidate.Email) {
      alert('Please fill in Name and Email');
      return;
    }

    axios.post('http://localhost:5000/addCandidate', newCandidate, {
      headers: { Authorization: token }
    })
      .then(() => {
        fetchCandidates();
        setNewCandidate({ Name: '', Email: '', Phone: '', Address: '', Position_Applied: '' });
      })
      .catch(err => console.error('Error adding candidate:', err));
  };

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>HR Dashboard</Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Add Candidate</Typography>
        <Grid container spacing={2}>
          {['Name', 'Email', 'Phone', 'Address', 'Position_Applied'].map(field => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                label={field.replace('_', ' ')}
                name={field}
                value={newCandidate[field]}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={addCandidate}>
              Add Candidate
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Candidate List</Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : candidates.length ? (
          <List>
            {candidates.map(c => (
              <div key={c.Candidate_ID}>
                <ListItem>
                  <ListItemText primary={c.Name} secondary={`Status: ${c.Status}`} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        ) : (
          <Typography>No candidates found.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default HRDashboard;

*/

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Divider
} from '@mui/material';

const HRDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Address: '',
    Position_Applied: ''
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchCandidates = useCallback(() => {
    setLoading(true);
    axios.get('http://localhost:5000/hr/candidates', {
      headers: { Authorization: token }
    })
      .then(res => setCandidates(res.data))
      .catch(err => console.error('Error fetching candidates:', err))
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate(prev => ({ ...prev, [name]: value }));
  };

  const addCandidate = () => {
    if (!newCandidate.Name || !newCandidate.Email) {
      alert('Please fill in Name and Email');
      return;
    }

    axios.post('http://localhost:5000/addCandidate', newCandidate, {
      headers: { Authorization: token }
    })
      .then(() => {
        fetchCandidates();
        setNewCandidate({ Name: '', Email: '', Phone: '', Address: '', Position_Applied: '' });
      })
      .catch(err => console.error('Error adding candidate:', err));
  };

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom color="primary">
        HR Dashboard
      </Typography>

      <Box border={1} borderColor="grey.300" borderRadius={3} p={3} mb={4}>
        <Typography variant="h5" gutterBottom color="secondary">Add New Candidate</Typography>
        <Grid container spacing={2}>
          {['Name', 'Email', 'Phone', 'Address', 'Position_Applied'].map(field => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                label={field.replace('_', ' ')}
                name={field}
                value={newCandidate[field]}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          ))}
          <Grid item xs={12} textAlign="center">
            <Button variant="contained" size="large" color="secondary" onClick={addCandidate}>
              Add Candidate
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box border={1} borderColor="grey.300" borderRadius={3} p={3}>
        <Typography variant="h5" gutterBottom color="secondary">Candidate List</Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : candidates.length ? (
          <List>
            {candidates.map(c => (
              <Box key={c.Candidate_ID} px={2} py={1}>
                <ListItem disableGutters>
                  <ListItemText
                    primary={<Typography variant="h6">{c.Name}</Typography>}
                    secondary={<Typography variant="body2" color="text.secondary">Status: {c.Status}</Typography>}
                  />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        ) : (
          <Typography>No candidates found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default HRDashboard;
