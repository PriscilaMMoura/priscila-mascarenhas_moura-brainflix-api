const express = require("express");
const router = express.Router();
const path = require("node:path");

const videosJSONFile = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONFile);

const newVideos = videos.map((video) => {
  return {
    id: video.id,
    title: video.title,
    channel: video.channel,
    image: video.image,
  };
});

router.get("/", (_req, res) => {
  try {
    res.status(200).json(newVideos);
  } catch (error) {
    console.log("Error retrieving the videos", error);
  }
});

router.get("/:videoId", (req, res) => {
  const videoDetails = videos.find((video) => video.id === req.params.videoId);
  videoDetails
    ? res.status(200).json(videoDetails)
    : res
        .status(404)
        .json({ error: `No video with ID ${req.params.videoId} exists.` });
});

module.exports = router;
