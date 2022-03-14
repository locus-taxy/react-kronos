module.exports = {
  "plugins":[
    "@babel/plugin-proposal-function-bind",
    "transform-react-remove-prop-types"
  ],
  "presets": [
    "@babel/preset-react",
    ["@babel/preset-env", {
      "modules": process.env.MODULES === 'commonjs' ? 'commonjs' : false,
      "targets": {
        "browsers": ["chrome>=55"]
      }
    }]
  ]
}
