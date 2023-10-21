const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
const upload = require("../database/config/cloudinary.config");

const bufferToStream = (buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};

const uploadSingleHelper = (type) => {
  return (req, res, next) => {
    const singleUpload = upload.single("file");
    singleUpload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Please upload an image." });
      }
      try {
        const data = await sharp(req.file.buffer)
          // .resize({ width: 150, height: 97 })
          .toFormat("jpeg", { mozjpeg: true })
          .toBuffer();
        const stream = cloudinary.uploader.upload_stream(
          { folder: "viettaiit-ecommerce/" + type },
          (error, result) => {
            if (error) return console.error(error);
            req.file.path = result.secure_url;
            next();
          }
        );
        bufferToStream(data).pipe(stream);
      } catch (error) {
        return res.status(500).json({ error: "Image processing error." });
      }
    });
  };
};

const uploadMultipleHelper = (type) => (req, res, next) => {
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
    let urls = [];
    for (const file of req.files) {
      try {
        const data = await sharp(file.buffer)
          // .resize({ width: 150, height: 97 })
          .toFormat("png", { mozjpeg: true })
          .toBuffer();
        const stream = cloudinary.uploader.upload_stream(
          { folder: "viettaiit-ecommerce/" + type },
          (error, result) => {
            if (error) return console.error(error);
            urls.push(result.secure_url);
            if (urls.length === req.files.length) {
              // Nếu đã tải lên và xử lý tất cả các tệp
              urls.forEach((url, idx) => {
                req.files[idx].path = url; // Gán mảng uploadedFiles vào req.files
              });

              next(); // Tiếp tục với middleware tiếp theo
            }
          }
        );
        bufferToStream(data).pipe(stream);
      } catch (error) {
        return res.status(500).json({ error: "Image processing error." });
      }
    }
  });
};

module.exports = {
  uploadSingleHelper,
  uploadMultipleHelper,
};
