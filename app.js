const Jimp = require('jimp')
const Unsplash = require('unsplash-js').default
const Storage = require('@google-cloud/storage')
const firebase = require('firebase')
const admin = require('firebase-admin')
require('firebase/firestore')
//node fetch polyfill
require('es6-promise').polyfill()
require('isomorphic-fetch')

const serviceAccount = require('./sdkKey.json')

//api keys
const keys = require('./keys')

//bokeh-fy images
const blurImage = (url, slug) => {
  return Jimp.read(url)
    .then(function(image) {
      return image
        .blur(150)
        .quality(80)
        .scaleToFit(2560, 2560)
        .write(`images/${slug}.jpg`)
    })
    .catch(function(err) {
      console.log(err)
    })
}

//upload to firebase
const upload = slug => {
  const filename = `images/${slug}.jpg`

  storage
    .bucket(bucketName)
    .upload(filename)
    .then(filename => {
      console.log(`${filename} uploaded to ${bucketName}.`)
      // getPublicUrl(filename);
    })
    .catch(err => {
      console.error('ERROR:', err)
    })
}

// const getPublicUrl = filename => {
//   storage
//     .bucket(bucketName)
//     .file(filename)
//     .getSignedUrl({
//       action: "read",
//       expires: "03-09-2491"
//     })
//     .then(signedUrls => {
//       console.log(signedUrls[0]);
//     });
// };

// const uploadMeta = slug => {
//   const docRef = db.collection("images").doc(slug);
//   const setImage = docRef.set({
//     author: author,
//     attrUrl: attrUrl
//   });
// };

//unsplash setup
const unsplash = new Unsplash({
  applicationId: keys.unsplashApi,
  secret: keys.unsplashSecret,
  callbackUrl: 'http://localhost:3000/',
})

//unsplash api
unsplash.photos
  .getRandomPhoto({ collections: ['1065396', '1065412'] })
  .then(res => res.json())
  .then(json => {
    console.log(json)
    const url = json.urls.full
    const author = json.user.name
    const attrUrl = `${
      json.links.html
    }?utm_source=your_app_name&utm_medium=referral`
    const slug = `${json.user.username}-${json.id}-unbokeh`.toLowerCase()

    async function processData() {
      await blurImage(url, slug)
      await upload(slug)
      // uploadMeta();
    }

    processData()
  })
