const express = require('express');
const { upload } = require('../utils/upload');
const { requireAuth } = require('../auth/requireAuth');

const router = express.Router();

//Надсилання фото на сервер для фото в кроках
// formData з  полем: image
router.post('/image', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Файл не надіслано' });
  }

  const url = `/uploads/${req.file.filename}`;
  res.status(201).json({ url });
});

module.exports = router;
