import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/geocode", async (req, res) => {
  const place = req.query.place;
  if (!place) {
    return res.status(400).json({ error: "กรุณาใส่ชื่อสถานที่" });
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
    const response = await fetch(url, {
      headers: { "User-Agent": "adalo-app" }
    });
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon, display_name } = data[0];
      res.json({ lat, lon, display_name });
    } else {
      res.json({ error: "ไม่พบข้อมูลสถานที่" });
    }
  } catch (error) {
    res.status(500).json({ error: "มีปัญหาการเชื่อมต่อ" });
  }
});

export default app;
