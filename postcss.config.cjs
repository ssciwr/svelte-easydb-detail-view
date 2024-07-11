const tailwindcss = require("tailwindcss");

const config = {
  plugins: [
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    tailwindcss(),
  ],
};

module.exports = config;
