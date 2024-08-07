const express = require("express");
const router = express.Router();
const Gift = require("../models/Gift");
const Setting = require("../models/Setting");
const multer = require("multer");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const { connectToDatabase } = require("../database.js");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Access s3Client globally
const s3Client = global.s3Client;


// Get all gifts
router.get("/allgifts", async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.json({ gifts: gifts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch a gift
router.get("/gift/:id", async (req, res) => {
  const { id } = req.params;
  const gift = await Gift.findById(id);

  res.json({ message: "Success", gift: gift });
});

// Create a new gift
router.post("/newGift", upload.array("giftPhotos", 10), async (req, res) => {
  console.log("New Gift saving")
  req.body.highlights = req.body.highlights.split(",");
  var giftData = req.body;
  giftData.checkedTags = giftData.checkedTags.split(",");
  giftData.checkedVariants = JSON.parse(giftData.checkedVariants);
  giftData.selectedCategories = JSON.parse(giftData.selectedCategories);
  const uploadedImages = [];

  for (const file of req.files) {
    var imageId = uuidv4();
    const params = {
      Bucket: "rgiftingz",
      Key: imageId,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    var resp = await s3Client.send(command);
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    uploadedImages.push(imageUrl);
    console.log("one image uplaoded")
  }
  giftData["photos"] = uploadedImages;
  const db = await connectToDatabase();

  const collection = db.collection("gifts");
  const result = await collection.insertOne(giftData);

  // const newGift = new Gift(giftData);
  // await newGift.save();
  console.log("gift saved");

  res.json({ success: "sucess" });
});

// Update a gift
router.put("/gift/:id", upload.array("giftPhotos", 10), async (req, res) => {});

//Fetch Settings
router.get("/settings", async (req, res) => {
  const settings = await Setting.find();
  res.json({ settings: settings });
});

//Update Settings
router.put("/settings", upload.none(), async (req, res) => {
  var newSettings = JSON.parse(req.body.settings);
  try {
    const result = await Setting.findOneAndUpdate(
      { settingType: req.body.settingType },
      { $set: { settings: newSettings } },
      { new: true, upsert: true }
    );

    if (result) {
      res.json({ message: "Settings updated successfully" });
    } else {
      res.status(404).json({ message: 'SettingType "Tags" not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
