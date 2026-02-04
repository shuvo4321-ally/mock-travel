import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#FF6B00", // UGS Orange
                    50: "#fff8ec",
                    100: "#ffefd3",
                    200: "#ffdaa6",
                    300: "#ffc072",
                    400: "#ff9d3a",
                    500: "#ff6b00",
                    600: "#e65000",
                    700: "#cc3e00",
                    800: "#a63000",
                    900: "#862800",
                    950: "#4d1200",
                },
                secondary: {
                    DEFAULT: "#000000", // UGS Black
                    50: "#f6f6f6",
                    100: "#e7e7e7",
                    200: "#d1d1d1",
                    300: "#b0b0b0",
                    400: "#888888",
                    500: "#6d6d6d",
                    600: "#5d5d5d",
                    700: "#4f4f4f",
                    800: "#454545",
                    900: "#3d3d3d",
                    950: "#000000",
                },
                accent: {
                    DEFAULT: "#22C55E", // Green from Globe
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    200: "#bbf7d0",
                    300: "#86efac",
                    400: "#4ade80",
                    500: "#22c55e",
                    600: "#16a34a",
                    700: "#15803d",
                    800: "#166534",
                    900: "#14532d",
                    950: "#052e16",
                },
            },
            fontFamily: {
                sans: ["Outfit", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
