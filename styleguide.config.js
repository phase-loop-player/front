const { version } = require("./package")

module.exports = {
  version,
  usageMode: "expand",
  exampleMode: "expand",
  defaultExample: true,
  ignore: [
    "src/**/*Container.js",
    "src/*.js",
    "**/__tests__/**",
    "**/*.test.{js,jsx,ts,tsx}",
    "**/*.spec.{js,jsx,ts,tsx}",
    "**/*.d.ts"
  ],
  components: ["src/**/[A-Z]*.js"],
  styleguideDir: "build-docs",
  template: {
    head: {
      links: [
        {
          rel: "stylesheet",
          href:
            "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        }
      ]
    }
  }
}
