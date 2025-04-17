import React, { useState, useEffect } from "react";
import axios from "axios";

const Assets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/assets")
      .then((response) => setAssets(response.data))
      .catch((error) => console.error("Error fetching assets:", error));
  }, []);

  return (
    <div>
      <h2>Company Assets</h2>
      <ul>
        {assets.map((asset) => (
          <li key={asset.Asset_ID}>
            {asset.Asset_Name} - {asset.Allocation_Status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assets;
