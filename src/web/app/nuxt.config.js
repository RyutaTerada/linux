const colors = require('vuetify/es5/util/colors').default

const bodyParser = require('body-parser')
const session = require('express-session')
var MemoryStore = require('memorystore')(session)

module.exports = {
  mode: 'universal',

  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'tenshoku',
      store: new MemoryStore({
        checkPeriod: 86400000
      }),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 6000000}
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api/index.js'
  ],


  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet' , href:'https://fonts.googleapis.com/earlyaccess/hannari.css'},
      { rel: 'stylesheet' , href:'https://fonts.googleapis.com/css?family=Sawarabi+Mincho'}
      //https://fonts.googleapis.com/css?family=Sawarabi+Mincho
      //<link href="https://fonts.googleapis.com/earlyaccess/hannari.css" rel="stylesheet">
      //<link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c&display=swap" rel="stylesheet">
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/chart.js',
    '~/plugins/bar_chart.js',
    '~/plugins/v-lazy-image.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
