// next.config.js
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  [
    optimizedImages,
    {
      // https://github.com/cyrilwanner/next-optimized-images#example
      inlineImageLimit: 8192,
      imagesFolder: 'images',
      imagesName: '[name]-[hash].[ext]',
      handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
      removeOriginalExtension: false,
      optimizeImages: true,
      optimizeImagesInDev: false,
      mozjpeg: {
        quality: 80,
      },
      optipng: {
        optimizationLevel: 3,
      },
      pngquant: false,
    },
  ],
]);
