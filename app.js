const Jimp = require("jimp");
const Unsplash = require("unsplash-js").default;

//node fetch polyfill
require("es6-promise").polyfill();
require("isomorphic-fetch");

//api keys
const keys = require("./keys");

//bokeh-fy images
const blurImage = url => {
  Jimp.read(url)
    .then(function(image) {
      return image
        .blur(150)
        .quality(80)
        .scaleToFit(2560, 2560)
        .write("new-image-5.jpg");
    })
    .catch(function(err) {
      console.log(err);
    });
};

//unsplash setup
const unsplash = new Unsplash({
  applicationId: keys.applicationId,
  secret: keys.secret,
  callbackUrl: "http://localhost:3000/"
});

//unsplash api
unsplash.photos
  .getRandomPhoto({ collections: ["1065396", "1065412"] })
  .then(res => res.json())
  .then(json => {
    console.log(json);
    const path = json.urls.full;
    const author = json.user.name;
    const attr = `${
      json.links.html
    }?utm_source=your_app_name&utm_medium=referral`;

    blurImage(path);
  });
