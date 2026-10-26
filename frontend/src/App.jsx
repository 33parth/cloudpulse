import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [health, setHealth] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const fetchHealth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/health"
      );

      setHealth(response.data);
      setError("");
    } catch (err) {
      setHealth(null);
      setError("Backend service is unavailable");
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/events"
      );

      setEvents(response.data.events);
    } catch (err) {
      console.error("Unable to fetch events");
    }
  };

  useEffect(() => {
    fetchHealth();
    fetchEvents();

    const interval = setInterval(() => {
      fetchHealth();
      fetchEvents();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>CloudPulse</h1>
          <p>Cloud Infrastructure Monitoring Dashboard</p>
        </div>

        <div
          className={
            health?.status === "healthy"
              ? "status healthy"
              : "status unhealthy"
          }
        >
          {health?.status === "healthy"
            ? "● ONLINE"
            : "● OFFLINE"}
        </div>
      </header>

      <main>
        <section className="cards">
          <div className="card">
            <h3>API Status</h3>
            <p>
              {health?.status || "Unavailable"}
            </p>
          </div>

          <div className="card">
            <h3>Database</h3>
            <p>
              {health?.database || "Unavailable"}
            </p>
          </div>

          <div className="card">
            <h3>Uptime</h3>
            <p>
              {health
                ? `${Math.floor(health.uptime)} sec`
                : "0 sec"}
            </p>
          </div>

          <div className="card">
            <h3>Events</h3>
            <p>{events.length}</p>
          </div>
        </section>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <section className="events-section">
          <h2>Recent System Events</h2>

          {events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            <div className="event-list">
              {events.map((event) => (
                <div
                  className="event-item"
                  key={event.id}
                >
                  <div>
                    <strong>
                      {event.event_type}
                    </strong>

                    <p>{event.message}</p>
                  </div>

                  <span>
                    {event.severity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;