const Jimp = require("jimp");

Jimp.read("image.jpg")
  .then(function(image) {
    return image
      .blur(150)
      .quality(100)
      .write("image-blur.jpg");
  })
  .catch(function(err) {
    console.log(err);
  });
