import axios from 'axios';

// Set base URL for API calls
const API = axios.create({
    baseURL: 'http://localhost:5000'  // Backend running at port 5000
});

// Get all candidates
export const getCandidates = async () => {
    try {
        const response = await API.get('/candidates');
        return response.data;
    } catch (error) {
        console.error("Error fetching candidates:", error);
        return [];
    }
};

// Add a new candidate
export const addCandidate = async (candidate) => {
    try {
        const response = await API.post('/candidates', candidate);
        return response.data;
    } catch (error) {
        console.error("Error adding candidate:", error);
    }
};

// Export other functions as needed...
