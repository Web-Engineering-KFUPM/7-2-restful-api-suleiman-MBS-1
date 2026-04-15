import express from "express";
import cors from "cors";

// import dotenv and load environment variables from .env
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db.js";
import { Song } from "./models/song.model.js";

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());              
app.use(express.json());

await connectDB(process.env.MONGO_URL);

// TODO 3: POST /api/songs (Insert)
app.post("/api/songs", async (req, res) => {
  try {
    const { title = "", artist = "", year } = req.body || {};
    const created = await Song.create({
      title: title.trim(),
      artist: artist.trim(),
      year
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to create song" });
  }
});

// TODO 4: GET /api/songs (Read all)
app.get("/api/songs", async (req, res) => {
  const rows = await Song.find().sort({ createdAt: -1 });
  res.json(rows);
});

// TODO 4: GET /api/songs/:id (Read one)
app.get("/api/songs/:id", async (req, res) => {
  const s = await Song.findById(req.params.id);
  if (!s) return res.status(404).json({ message: "Song not found" });
  res.json(s);
});

// TODO 5: PUT /api/songs/:id (Update)
app.put("/api/songs/:id", async (req, res) => {
  try {
    const updated = await Song.findByIdAndUpdate(
      req.params.id,
      req.body || {},
      { new: true, runValidators: true, context: "query" }
    );
    if (!updated) return res.status(404).json({ message: "Song not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed to update song" });
  }
});

// TODO 6: DELETE /api/songs/:id
app.delete("/api/songs/:id", async (req, res) => {
  const deleted = await Song.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Song not found" });
  res.status(204).end();
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));


/*import express from "express";
import cors from "cors";

// import dotenv and load environment variables from .env


import { connectDB } from "./db.js";
import { Song } from "./models/song.model.js";

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());              
app.use(express.json());

await connectDB(process.env.MONGO_URL);

// api/songs (Read all songs)


// api/songs (Insert song)

// /api/songs/:id (Update song)


// /api/songs/:id (Delete song)

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));*/