/*
// src/pages/CandidateDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateDashboard = () => {
  const [rounds, setRounds] = useState([]);
  const [onboarding, setOnboarding] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const [roundsRes, onboardingRes, notifRes] = await Promise.all([
          axios.get('http://localhost:5000/candidate/rounds', {
            headers: { Authorization: token }
          }),
          axios.get('http://localhost:5000/candidate/onboarding', {
            headers: { Authorization: token }
          }),
          axios.get('http://localhost:5000/candidate/notifications', {
            headers: { Authorization: token }
          })
        ]);

        setRounds(Array.isArray(roundsRes.data) ? roundsRes.data : []);
        setOnboarding(onboardingRes.data);
        setNotifications(Array.isArray(notifRes.data) ? notifRes.data : []);
      } catch (err) {
        console.error('Error loading candidate dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateData();
  }, [token]);

  return (
    <div>
      <h2>Candidate Dashboard</h2>

      {loading ? <p>Loading...</p> : (
        <>
          <h3>Interview Rounds</h3>
          <ul>
            {rounds.length ? rounds.map(r => (
              <li key={r.Round_ID}>Round {r.Round_Number} - Status: {r.Status}</li>
            )) : <p>No interview rounds available.</p>}
          </ul>

          <h3>Onboarding</h3>
          {onboarding ? (
            <div>
              <p>Training: {onboarding.Training_Schedule}</p>
              <p>Joining: {onboarding.Joining_Date}</p>
              <p>Team: {onboarding.Team_Assignment}</p>
            </div>
          ) : <p>No onboarding information available.</p>}

          <h3>Notifications</h3>
          <ul>
            {notifications.length ? notifications.map(n => (
              <li key={n.Notification_ID}>{n.Message}</li>
            )) : <p>No notifications yet.</p>}
          </ul>
        </>
      )}
    </div>
  );
};

export default CandidateDashboard;
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Divider,
  Grid
} from '@mui/material';

const CandidateDashboard = () => {
  const [rounds, setRounds] = useState([]);
  const [onboarding, setOnboarding] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const [roundsRes, onboardingRes, notifRes] = await Promise.all([
          axios.get('http://localhost:5000/candidate/rounds', {
            headers: { Authorization: token }
          }),
          axios.get('http://localhost:5000/candidate/onboarding', {
            headers: { Authorization: token }
          }),
          axios.get('http://localhost:5000/candidate/notifications', {
            headers: { Authorization: token }
          })
        ]);

        setRounds(Array.isArray(roundsRes.data) ? roundsRes.data : []);
        setOnboarding(onboardingRes.data);
        setNotifications(Array.isArray(notifRes.data) ? notifRes.data : []);
      } catch (err) {
        console.error('Error loading candidate dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateData();
  }, [token]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Candidate Dashboard</Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>Interview Rounds</Typography>
            {rounds.length ? (
              <List>
                {rounds.map(r => (
                  <React.Fragment key={r.Round_ID}>
                    <ListItem>
                      <ListItemText
                        primary={`Round ${r.Round_Number}`}
                        secondary={`Status: ${r.Status}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography>No interview rounds available.</Typography>
            )}
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>Onboarding</Typography>
            {onboarding ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography>Training: {onboarding.Training_Schedule}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography>Joining: {onboarding.Joining_Date}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography>Team: {onboarding.Team_Assignment}</Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography>No onboarding information available.</Typography>
            )}
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Notifications</Typography>
            {notifications.length ? (
              <List>
                {notifications.map(n => (
                  <React.Fragment key={n.Notification_ID}>
                    <ListItem>
                      <ListItemText primary={n.Message} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography>No notifications yet.</Typography>
            )}
          </Paper>
        </>
      )}
    </Container>
  );
};

export default CandidateDashboard;
