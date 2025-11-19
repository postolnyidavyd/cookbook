const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, '../../uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
//Налатування storage
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, UPLOAD_DIR),
  //зміна імені для уникнення конфліктів
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname);

    callback(null, `${Date.now()}-${Math.round(Math.random() * 1000_000_000)}${extension}`);
  },
});

//Відфільтровуємо некоректні файли
function fileFilter(_req, file, callback) {
  if (!file.mimetype.startsWith('image/')) {
    return callback(new Error('Дозволені лише зображення'), false);
  }
  callback(null, true);
}

// Ініціалізація
const upload = multer({
  storage,
  limits: {
    fileSize: 5242880, // 5MB
  },
  fileFilter,
});

module.exports = { upload, UPLOAD_DIR };
