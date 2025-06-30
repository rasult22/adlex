/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'inter-400': ['Inter_400Regular'],
        'inter-500': ['Inter_500Medium'],
        'inter-600': ['Inter_600SemiBold'],
        'inter-700': ['Inter_700Bold'],
        'inter-800': ['Inter_800ExtraBold'],
        'inter-900': ['Inter_900Black'],
        'inter-400-i': ['Inter_400Regular_Italic'],
        'inter-500-i': ['Inter_500Medium_Italic'],
        'inter-600-i': ['Inter_600SemiBold_Italic'],
        'inter-700-i': ['Inter_700Bold_Italic'],
        'inter-800-i': ['Inter_800ExtraBold_Italic'],
        'inter-900-i': ['Inter_900Black_Italic'],
      },
      boxShadow: {
        'intro-circle': '0px 0px 250px 0px #753EFF;'
      }
    },
  },
  plugins: [],
}