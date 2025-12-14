const { cloudinary } = require("./upload");

const deletePhoto = async (imageUrl) => {
  if (imageUrl.includes("cloudinary.com")) {
    try {
      // Регулярний вираз, який витягує все після "upload/" (і версії v...) до розширення файлу
      const publicIdMatch = avatarUrl.match(/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
      if (publicIdMatch && publicIdMatch[1]) {
        const publicId = publicIdMatch[1];

        // Видаляємо через API
        await cloudinary.uploader.destroy(publicId);
        console.log(`Видалено з Cloudinary: ${publicId}`);
      }
    } catch (error) {
      console.error("Помилка видалення фото з Cloudinary:", error);
    }
  }
};

module.exports  = deletePhoto;