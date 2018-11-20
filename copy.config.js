/**
 * Created by Mohamad on 11/3/2018.
 */
// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {
    include: [
      {
          src: 'src/assets/',
          dest: 'www/assets/'
      },
      {
          src: 'src/libs/',
          dest: 'www/libs/'
      },
      {
          src: 'src/index.html',
          dest: 'www/index.html'
      },
      {
          src: 'src/service-worker.js',
          dest: 'www/service-worker.js'
      },
      {
          src: 'node_modules/ionic-angular/polyfills/polyfills.js',
          dest: 'www/build/polyfills.js'
      },
      {
          src: 'node_modules/ionicons/dist/fonts/',
          dest: 'www/assets/fonts/'
      },
      {
          src: 'node_modules/font-awesome/fonts/',
          dest: 'www/fonts/'
      },
      {
          src: 'node_modules/font-awesome/css/',
          dest: 'www/css/'
      },
      {
          src: 'node_modules/bootstrap/dist/css/',
          dest: 'www/css/'
      }
    ]
};