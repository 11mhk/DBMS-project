import React, { useState, useEffect } from "react";
import axios from "axios";

const Onboarding = () => {
  const [onboardingData, setOnboardingData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/onboarding")
      .then((response) => setOnboardingData(response.data))
      .catch((error) => console.error("Error fetching onboarding data:", error));
  }, []);

  return (
    <div>
      <h2>Onboarding Details</h2>
      <ul>
        {onboardingData.map((data) => (
          <li key={data.Onboarding_ID}>
            Candidate {data.Candidate_ID} - Team: {data.Team_Assignment}, Joining: {data.Joining_Date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Onboarding;
