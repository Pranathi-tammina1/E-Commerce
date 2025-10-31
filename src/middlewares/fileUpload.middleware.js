//Import multer
import multer from "multer";

//Configure storage with filename and location

const storage = multer.diskStorage({
  desstination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date.toISOString() + file.originalname);
  },
});

export const upload = multer({ storage: storage });
