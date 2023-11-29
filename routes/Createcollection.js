const express = require('express');
const router = express.Router();
const CreateController = require('../controller/Createcontroller');

router.post('/Createcollection', CreateController.handleCreateCollection);

module.exports = router;