const colors = require('./src/lib/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  //darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        // inter: ['Inter'],
        inter: ['Inter_400Regular'],
        'inter-medium': ['Inter_500Medium'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-bold': ['Inter_700Bold'],
        ibm: ['IBMPlexSans_400Regular'],
        'ibm-medium': ['IBMPlexSans_500Medium'],
        'ibm-semibold': ['IBMPlexSans_600SemiBold'],
        'ibm-bold': ['IBMPlexSans_700Bold'],
      },
      colors,
    },
  },
  plugins: [],
};
