/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/constants/**/*.{js,ts,jsx,tsx}",// اضافه کردن تمام فایل‌های جاوا اسکریپت و تایپ اسکریپت درون فولدر pages
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
