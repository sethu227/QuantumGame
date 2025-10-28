import mongoose from "mongoose";

const gameDataSchema = new mongoose.Schema({
  title: String,
  concept: String,
  difficulty: String,
  description: String
});

export default mongoose.model("GameData", gameDataSchema);
