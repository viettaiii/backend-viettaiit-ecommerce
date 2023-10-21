const { uploadSingleHelper ,uploadMultipleHelper} = require("../helpers/uploadHelper");

const router = require("express").Router();
const { uploadSingle ,uploadMultiple} = require("../controllers/upload.ctrl");
// const { uploadSingle, uploadMultiple } = require("../helpers/uploadHelper");
router.post("/single", uploadSingleHelper, uploadSingle);
router.post("/multiple", uploadMultipleHelper,uploadMultiple);

module.exports = router;
