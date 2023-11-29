const mongoose = require('mongoose');

// Create Collection model (you may need to adjust the schema)
const collectionSchema = new mongoose.Schema({
    logo: String,
    collectionName: String,
    description: String,
    collectionUrl: String,
  });

  const CollectionModel = mongoose.model('Collection', collectionSchema);
module.exports = CollectionModel;
