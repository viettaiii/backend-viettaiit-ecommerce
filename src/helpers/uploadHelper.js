// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, "viet-tai-" + uniqueSuffix + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// const uploadSingle = upload.single("file");
// const uploadMultiple = upload.array("multiple");
// module.exports = {
//   uploadSingle,
//   uploadMultiple,
// };

const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const BadRequestError = require("../errors/badRequestError");

const storage = multer.memoryStorage(); // Store the file in memory before processing

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new BadRequestError("Invalid file type. Only images are allowed."),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const uploadSingleHelper = (req, res, next) => {
  const singleUpload = upload.single("file");

  singleUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image." });
    }

    try {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename =
        "viet-tai-" + uniqueSuffix + path.extname(req.file.originalname);

      // Resize and process the uploaded image
      await sharp(req.file.buffer)
        .resize({ width: 150, height: 97 })
        .toFormat("jpeg", { mozjpeg: true })
        .toFile("public/uploads/" + filename);

      req.imagePath = "public/uploads/" + filename;
      next();
    } catch (error) {
      return res.status(500).json({ error: "Image processing error." });
    }
  });
};
const uploadMultipleHelper = (req, res, next) => {
  const multipleUpload = upload.array("multiple");
  multipleUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ error: "Please upload one or more images." });
    }

    try {
      for (const file of req.files) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename =
          "viet-tai-" +
          uniqueSuffix +
          "-" +
          file.originalname.split(" ").join("-");
        file.filename = filename;
        file.path = "public/uploads/" + filename;
        await sharp(file.buffer)
          // .resize({ width: 150, height: 97 })
          .toFormat("jpeg", { mozjpeg: true })
          .toFile("public/uploads/" + filename);
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: "Image processing error." });
    }
  });
};

module.exports = {
  uploadSingleHelper,
  uploadMultipleHelper,
};
