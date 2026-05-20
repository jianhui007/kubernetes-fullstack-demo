import { useEffect, useState } from "react";

export default function Home() {
  const [apiStatus, setApiStatus] = useState("Checking backend...");
  const [dbStatus, setDbStatus] = useState("Checking database...");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.text())
      .then((data) => setApiStatus(data))
      .catch(() => setApiStatus("Backend API failed"));

    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => setDbStatus(data.message))
      .catch(() => setDbStatus("Database connection failed"));
  }, []);

  return (
    <main style={{ fontFamily: "Arial", padding: "40px" }}>
      <h1>Kubernetes Full Stack Demo</h1>

      <p>
        This frontend is running inside Kubernetes and calling the backend API.
      </p>

      <div style={{ marginTop: "20px" }}>
        <h2>Backend Status</h2>
        <p>{apiStatus}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Database Status</h2>
        <p>{dbStatus}</p>
      </div>
    </main>
  );
}
