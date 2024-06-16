const express = require("express");
const router = express.Router();
const Gift = require("../models/Gift");
const multer = require("multer");
const path = require("path");
const { ListBucketsCommand } = require("@aws-sdk/client-s3");

// Configure multer for file storage
const upload = multer({ dest: "uploads/" });

// Access s3Client globally
const s3Client = global.s3Client;

// Get all gifts
router.get("/", async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.json(gifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
router.post("/newGift", upload.single("file"), async (req, res) => {
  console.log("New Gift");
  const data = await s3Client.send(new ListBucketsCommand({}));
  console.log("List of Buckets:");
  data.Buckets.forEach((bucket) => {
    console.log(bucket.Name);
  });

  res.json({ success: "sucess" });
});

// Export the router
module.exports = router;
