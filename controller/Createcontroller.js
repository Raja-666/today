const multer = require('multer');
const path = require('path');
const Collection = require('../models/Schema');
const fs = require('fs');


// Multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
}).single("imageFile");


// Express middleware for handling file uploads
const handleCreateCollection = async (req, res) => {
  console.log(req.body);
  // return res.json({status:true , message:'collection created'})
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "logoImage upload failed", error: err });
    }

    const filePath = req.file.path;
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: "Uploaded logo file not found" });
    }

    try {
      const { collectionName, description, collectionUrl } = req.body;

      const sameCollectionName = await Collection.findOne({ collectionName: collectionName });
      if (sameCollectionName) {
        return res.status(400).json({
          message: "Collection Name Already Exists",
        });
      }

      // Create a new Collection document
      const newCollection = new Collection({
        logo: req.file.path, // Save the path to the uploaded logo
        collectionName,
        description,
        collectionUrl,
      });

      // Save the document to the database
      await newCollection.save();

      res.status(201).json({ success: true, message: 'Collection created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

  });
};

module.exports = { handleCreateCollection };
