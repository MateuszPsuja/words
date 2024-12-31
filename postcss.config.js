module.exports = {
  plugins: {
    autoprefixer: {
      grid: true, // if you are using Grid Layout
      overrideBrowserslist: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead', 'not ie <= 11'], // or your desired browserlist configuration
      ignoreUnknownVersions: true // add this to suppress the warning
    }
  }
}
