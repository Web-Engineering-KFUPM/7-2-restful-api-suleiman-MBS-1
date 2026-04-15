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

// api/songs (Read all songs)
app.get("/api/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

// api/songs (Insert song)
app.post("/api/songs", async (req, res) => {
  try {
    const newSong = await Song.create(req.body);
    res.status(201).json(newSong);
  } catch (error) {
    res.status(400).json({ error: "Failed to create song" });
  }
});

// /api/songs/:id (Update song)
app.put("/api/songs/:id", async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSong);
  } catch (error) {
    res.status(400).json({ error: "Failed to update song" });
  }
});

// /api/songs/:id (Delete song)
app.delete("/api/songs/:id", async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete song" });
  }
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