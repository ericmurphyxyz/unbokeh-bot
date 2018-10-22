const Jimp = require('jimp')
const Unsplash = require('unsplash-js').default
const fs = require('fs')
require('isomorphic-fetch')

//api keys
const keys = require('./keys')

const saveMetadata = (author, attrUrl, slug) => {
  //push all this metadata into a json file, you feeling me
  const database = '../unbokeh-client/src/data/metadata.json'
  const metadata = [{ author, attrUrl, path: `./images/${slug}.jpg` }]
  const json = JSON.parse(fs.readFileSync(database))
  json.push(...metadata)

  fs.writeFile(database, JSON.stringify(json), err => {})
}

//bokeh-fy images
const blurImage = (url, slug) => {
  return Jimp.read(url)
    .then(image => {
      return image
        .blur(150)
        .quality(80)
        .scaleToFit(2560, 2560)
        .write(`../unbokeh-client/src/data/images/${slug}.jpg`)
    })
    .catch(err => {
      console.log(err)
    })
}

//unsplash setup
const unsplash = new Unsplash({
  applicationId: keys.unsplashApi,
  secret: keys.unsplashSecret,
  callbackUrl: 'http://localhost:3000/',
})

//unsplash api
async function downloadPhoto(id) {
  await unsplash.photos
    .getPhoto(id)
    .then(res => res.json())
    .then(json => {
      console.log('1')
      const url = json.urls.full
      const author = json.user.name
      const attrUrl = `${
        json.links.html
      }?utm_source=unbokeh&utm_medium=referral`
      const slug = `${json.user.username}-${json.id}-unbokeh`.toLowerCase()

      // add metadata to database
      saveMetadata(author, attrUrl, slug)

      // blur the damn image!
      blurImage(url, slug)
    })
}

const photos = [
  // 'Ceuh97A6OYM',
  // '1Z2niiBPg5A',
  // 'u3qeLOkt8wM',
  // 'CSpjU6hYo_0',
  // 'eGJg5iRGlg8',
  // 'sHRIto0UraI',
  // 'EJjSAAm3EVg',
  // 'Cv4Mz62cJTY',
  // 'OqaavL4MpJQ',
  // 'BbY__DT0ou0',
  // 'dpVJtfywdX4',
  // '6hDViKSb65A',
  // 'OeGImGbmxls',
  // 'uYWU_y81yOk',
  // 'lbybdXUYWRs',
  // 'cf_KZGfROG8',
  // 'fUnfEz3VLv4',
  // 'Y_ihtQ4q9-E',
  // 'lf6iUWUJD2A',
  // 'ZhWD6PpEw8o',
  // 'yuJ95qXvPmA',
  // 'dPZgry0tj8k',
  // 'ZSoPWsA1Wxg',
  // 'o1TJ8uAI1Xc',
  // 'G2m_nnChw8M',
  // '23NOAD502Xw',
  'lUtPqjz5D5k',
  'vr_9IBUp9zg',
  'xmGeZL8gims',
  'RatxiOcaMZo',
  'XDPk8ndzNho',
  'cGViI7fgmGE',
  'z2icBh4A9i0',
  'IqW8saasx0E',
  'muMR2IhCbZ0',
  'UAmOAYVL4PU',
  '1i6mrD_t9gA',
  'Q_oXnSLxlSw',
  'G0miZ5OYaXI',
  'G0miZ5OYaXI',
  'TznjqhCHR9g',
  'Xa2ICcPqUew',
  'chc-oAL0gBU',
  'MKm8H6g5IeA',
  'yRIBEupK5j0',
  'VgR1-Z9kDNI',
  'aHetdmuNoO4',
  // 'NQ-Avc_MjLk',
  // '3iaV4wNnzks',
  // 'GJrtD-cvtgw',
  // 'cfKC0UOZHJo',
  // 'VCWOqNB4f2I',
  // 'eCohyQiC_qg',
  // 'eCohyQiC_qg',
  // 'XvKaRS_0Jik',
  // 'VgRyLtxFoOw',
  // 'FiUuNWxnb3k',
  // 'dLwDf4HEjVQ',
  // 'nJ7i1S0B_TI',
  // 'sqJ40H9RtNw',
  // 'ASKGjAeIY_U',
  // 'tU7sNs6tmt8',
  // '8NuHwPbO62k',
  // 'W3V2tQAZxPA',
  // 'R9OS29xJb-8',
  // 'ii5JY_46xH0',
  // '6tfO1M8_gas',
  // 'yEOCA6oiVqg',
  // '2oFdVd00xOg',
  // 'sYegwYtIqJg',
  // '-hI5dX2ObAs',
  // 'RbbdzZBKRDY',
  // 'MA8YoAoKpfY',
  // 'uCzBVrIbdvQ',
  // 'tb4wis6XoQk',
  // '3N5ccOE3wGg',
  // '-g7axSVst6Y',
  // 'cYrMQA7a3Wc',
  // '3igHRe7QTdg',
  // '78A265wPiO4',
  // '_hpk_92Crhs',
  // '62V7ntlKgL8',
  // 'dKJXkKCF2D8',
  // '3l3RwQdHRHg',
  // '__U6tHlaapI',
]

async function downloadPhotos(array) {
  for (const photo of array) {
    await downloadPhoto(photo)
  }
  console.log('done!')
}

downloadPhotos(photos)
