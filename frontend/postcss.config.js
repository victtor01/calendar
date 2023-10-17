const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
