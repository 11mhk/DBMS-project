import React, { useState } from "react";
import axios from "axios";

const AddCandidate = () => {
  const [candidate, setCandidate] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Address: "",
    Position_Applied: "",
    Status: "Pending",
  });

  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/addCandidate", candidate);
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert("Failed to add candidate.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="Name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="Email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="Phone" placeholder="Phone" onChange={handleChange} required />
      <input type="text" name="Address" placeholder="Address" onChange={handleChange} required />
      <input type="text" name="Position_Applied" placeholder="Position" onChange={handleChange} required />
      <button type="submit">Add Candidate</button>
    </form>
  );
};

export default AddCandidate;
