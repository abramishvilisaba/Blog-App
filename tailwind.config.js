/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                firaGO: ["firaGO", "sans-serif"],
            },
            colors: {
                primary: "#512BE7", // Main primary color
                primaryLight: "#F7F7FF", // Lighter shade of primary
                success: "#14D81C", // Success color
                successLight: "#F8FFF8", // Lighter shade of success
                error: "#EA1919", // Error color
                errorLight: "#FAF2F3", // Lighter shade of error
                greyFill: "#FAFAFA", // Grey for filling elements
                greyStroke: "#E4E3EB", // Grey for stroke or border
                greyText: "#85858D", // Grey for text
                altGreyFill: "#EFF1FB", // Alternative grey for filling elements
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
    variants: {
        scrollbar: ["rounded"],
    },
};
