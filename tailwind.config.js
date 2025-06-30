/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'roboto-400': ['Roboto_400Regular'],
        'roboto-500': ['Roboto_500Medium'],
        'roboto-600': ['Roboto_600SemiBold'],
        'roboto-700': ['Roboto_700Bold'],
        'roboto-800': ['Roboto_800ExtraBold'],
        'roboto-900': ['Roboto_900Black'],
        'roboto-400-i': ['Roboto_400Regular_Italic'],
        'roboto-500-i': ['Roboto_500Medium_Italic'],
        'roboto-600-i': ['Roboto_600SemiBold_Italic'],
        'roboto-700-i': ['Roboto_700Bold_Italic'],
        'roboto-800-i': ['Roboto_800ExtraBold_Italic'],
        'roboto-900-i': ['Roboto_900Black_Italic'],
      },
      boxShadow: {
        'intro-circle': '0px 0px 250px 0px #753EFF;'
      }
    },
  },
  plugins: [],
}