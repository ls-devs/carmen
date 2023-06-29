/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "red-carmen": "var(--RED-CARMEN)",
        "cream-carmen": "var(--CREAM-CARMEN)",
        "black-carmen": "var(--BLACK-CARMEN)",
      },
      backgroundPosition: {
        top: "-500px",
      },
      backgroundSize: {
        "100%": "100%",
      },
      backgroundImage: {
        "red-button": "url('/img/buttons/button_red.png')",
        "cream-button": "url('/img/buttons/button_cream.png')",
        price: "url('/img/la_carte/carte_price_bg_2x.png')",
        "form-underline": "url('/img/contact/contact_input_underline_2x.png)",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
    fontFamily: {
      thunder: ["Thunder", "sans-serif"],
      thunderLC: ["ThunderLC", "sans-serif"],
      softgank: ["Softgank", "sans-serif"],
    },
  },
  plugins: [],
};
