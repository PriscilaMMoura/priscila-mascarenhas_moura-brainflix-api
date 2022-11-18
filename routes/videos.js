const express = require("express");
const path = require("node:path");
const fs = require("node:fs");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
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

const writeJSONFile = (filePath, fileContent) => {
  fs.writeFileSync(filePath, JSON.stringify(fileContent), (err) => {
    err ? console.log(err) : console.log(`Changes saved to ${filePath}`);
  });
};

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

router.post("/", (req, res) => {
  const newPublishedVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: req.body.channel,
    image: req.body.image,
    description: req.body.description,
    views: "0",
    likes: "0",
    duration: "5:36",
    video: "",
    timestamp: Date.now(),
    comments: [],
  };

  videos.push(newPublishedVideo);
  writeJSONFile(videosJSONFile, videos);
  res.send(201);
});

module.exports = router;
