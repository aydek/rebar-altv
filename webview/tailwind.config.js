/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        '../src/plugins/**/*.{vue,js,ts,jsx,tsx}',
        './components/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            animation: {
                fadein: 'fadeIn .5s ease-in-out',
                fadeout: 'fadeOut .5s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                fadeOut: {
                    from: { opacity: 1 },
                    to: { opacity: 0 },
                },
            },
            colors: {
                'accent-50': '#f2f9f9',
                'accent-100': '#ddeff0',
                'accent-200': '#bfe0e2',
                'accent-300': '#92cace',
                'accent-400': '#5faab1',
                'accent-500': '#438e96',
                'accent-600': '#3b757f',
                'accent-700': '#356169',
                'accent-800': '#325158',
                'accent-900': '#2d464c',
                'accent-950': '#1a2c32',
            },
        },
    },
    plugins: [],
};
