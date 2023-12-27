/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                firaGO: ["firaGO", "sans-serif"],
            },
            colors: {
                backGround: "#FBFAFF",
                indigo: "#5D37F3",
                indigoLight: "#F7F7FF",
                success: "#14D81C",
                successLight: "#F8FFF8",
                error: "#EA1919",
                errorLight: "#FAF2F3",
                greyFill: "#FCFCFD",
                greyStroke: "#E4E3EB",
                grayText: "#85858D",
                darkGrayText: "#404049",
                altGrayFill: "#EFF1FB",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
    variants: {
        scrollbar: ["rounded"],
    },
};
