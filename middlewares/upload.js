const multer = require("multer");
const path = require("path");

// destination => simpan dimana filenya
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const randomFileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, randomFileName);
  },
});
// penggunaan .single image disini biar gaharus declare lagi di routes
const upload = multer({ storage: diskStorage }).single("image");

module.exports = upload;
