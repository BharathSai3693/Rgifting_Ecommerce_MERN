const express = require("express");
const router = express.Router();
const Gift = require("../models/Gift");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');


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

// Create a new gift
router.post("/newGift", upload.array("giftPhotos", 10), async (req, res) => {

req.body.highlights = req.body.highlights.split(",")
  var giftData = req.body;
  giftData.checkedTags = giftData.checkedTags.split(",")

  
  const uploadedImages = [];

  for (const file of req.files) {
    var imageId = uuidv4();
    const params = {
      Bucket: "rgiftingz",
      Key: imageId,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    uploadedImages.push(imageUrl);
    
  }
  giftData['photos'] = uploadedImages;

  console.log(giftData)
  // const newGift = new Gift(req.body);
  // await newGift.save();
  // console.log("gift saved")

  res.json({ success: "sucess" });
});


router.get("/giftImages", async (req,res) => {
  const command = new GetObjectCommand({
    Bucket: "rgiftingz",
    Key: '20220829_233332-COLLAGE.jpg',
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  console.log(url)
  res.json({"url": url})

})

// Export the router
module.exports = router;
