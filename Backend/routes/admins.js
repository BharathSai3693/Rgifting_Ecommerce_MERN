const express = require("express");
const router = express.Router();
const Gift = require("../models/Gift");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const storage = multer.memoryStorage();
const upload = multer({ storage });


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
router.post("/newGift", upload.array('giftPhotos', 10), async (req, res) => {
  console.log("New Gift");
  console.log(req.body);
  console.log(req.files)

  const uploadedImages = [];

  for (const file of req.files) {
    
    const params = {
      Bucket: "rgiftingz",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log("Sent")
    // const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

    // const newImage = new Image({
    //   key: params.Key,
    //   url: imageUrl,
    // });

    // await newImage.save();
    // uploadedImages.push(newImage);

    // fs.unlinkSync(file.path);
  }

  res.json({ success: "sucess" });
});

// Export the router
module.exports = router;
