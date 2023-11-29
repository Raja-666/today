const express = require('express');
const router = express.Router();
const multer = require('multer');
const kycController = require('../controller/Kyccontroller');

router.post('/KYC', kycController.handleKyccontrol);

module.exports = router;
