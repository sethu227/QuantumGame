import GameData from "../models/GameData.js";

export const getGames = async (req, res) => {
  const games = await GameData.find();
  res.json(games);
};
