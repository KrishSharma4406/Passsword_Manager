// Replaced ESM-style config (and removed markdown fences)
module.exports = {
  plugins: [
    // Use the new PostCSS plugin package for Tailwind
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};
