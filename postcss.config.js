const browserList = [
  '>1%',
  'last 4 versions',
  'Firefox ESR',
  'not ie < 11'
]
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: browserList
    }
  }
}
