module.exports = {
  "plugins":[
    // "@babel/plugin-transform-react-jsx",
    // "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-function-bind",
    "transform-react-remove-prop-types"
  ],
  "presets": [
    "@babel/preset-react",
    ["@babel/preset-env", {
      "modules": process.env.BABEL_ENV === 'commonjs' ? 'commonjs' : false,
      "targets": {
        "browsers": ["chrome>=55"]
      }
    }]
  ]
}
