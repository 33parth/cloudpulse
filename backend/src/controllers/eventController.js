const pool = require("../config/database");

const getEvents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM system_events ORDER BY created_at DESC"
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      events: result.rows,
    });
  } catch (error) {
    console.error("Error fetching events:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch system events",
    });
  }
};

const createEvent = async (req, res) => {
  try {
    const { event_type, message, severity, service_name } = req.body;

    if (!event_type || !message) {
      return res.status(400).json({
        success: false,
        message: "event_type and message are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO system_events
      (event_type, message, severity, service_name)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        event_type,
        message,
        severity || "INFO",
        service_name || "cloudpulse-api",
      ]
    );

    res.status(201).json({
      success: true,
      event: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating event:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create system event",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
};
