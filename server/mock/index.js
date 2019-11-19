const express = require("express");
const router = express.Router();
const System = require("./system");
const File = require("./file");
const User = require("./user");
const Organization = require("./organization");
const Education = require("./education");
const NativeCity = require("./native-city");


router.use('/system', System);
router.use('/file', File);
router.use('/user', User);
router.use('/organization', Organization);
router.use('/education', Education);
router.use('/nativeCity', NativeCity);

module.exports = router;
