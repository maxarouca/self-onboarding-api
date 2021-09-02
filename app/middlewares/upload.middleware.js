const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../config/db.config");

const storage = new GridFsStorage({
  url: dbConfig.url,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname.replace(" ", "")}`;
      return filename;
    }
    return {
      bucketName: "files",
      filename: `${Date.now()}-${file.originalname.replace(" ", "")}`,
    };
  },
});

module.exports = multer({ storage });
