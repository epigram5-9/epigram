/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard'],
        iropkeBatang: ['IropkeBatang'],
      },
      fontSize: {
        // Pretendard settings
        'pretendard-3xl': [
          '32px',
          {
            lineHeight: '42px',
            fontWeight: '700',
          },
        ],
        'pretendard-2xl-bold': [
          '24px',
          {
            lineHeight: '32px',
            fontWeight: '700',
          },
        ],
        'pretendard-2xl-semibold': [
          '24px',
          {
            lineHeight: '32px',
            fontWeight: '600',
          },
        ],
        'pretendard-2xl-medium': [
          '24px',
          {
            lineHeight: '32px',
            fontWeight: '500',
          },
        ],
        'pretendard-2xl-regular': [
          '24px',
          {
            lineHeight: '32px',
            fontWeight: '400',
          },
        ],
        'pretendard-xl-semibold': [
          '20px',
          {
            lineHeight: '32px',
            fontWeight: '600',
          },
        ],
        'pretendard-xl-medium': [
          '20px',
          {
            lineHeight: '32px',
            fontWeight: '500',
          },
        ],
        'pretendard-xl-regular': [
          '20px',
          {
            lineHeight: '32px',
            fontWeight: '400',
          },
        ],
        'pretendard-lg-semibold': [
          '16px',
          {
            lineHeight: '26px',
            fontWeight: '600',
          },
        ],
        'pretendard-lg-medium': [
          '16px',
          {
            lineHeight: '26px',
            fontWeight: '500',
          },
        ],
        'pretendard-lg-regular': [
          '16px',
          {
            lineHeight: '26px',
            fontWeight: '400',
          },
        ],
        'pretendard-md-bold': [
          '14px',
          {
            lineHeight: '24px',
            fontWeight: '700',
          },
        ],
        'pretendard-md-semibold': [
          '14px',
          {
            lineHeight: '24px',
            fontWeight: '600',
          },
        ],
        'pretendard-md-medium': [
          '14px',
          {
            lineHeight: '24px',
            fontWeight: '500',
          },
        ],
        'pretendard-md-regular': [
          '14px',
          {
            lineHeight: '24px',
            fontWeight: '400',
          },
        ],
        'pretendard-sm-medium': [
          '13px',
          {
            lineHeight: '22px',
            fontWeight: '500',
          },
        ],
        'pretendard-xs-semibold': [
          '12px',
          {
            lineHeight: '20px',
            fontWeight: '600',
          },
        ],
        'pretendard-xs-regular': [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '400',
          },
        ],

        // IropkeBatang settings
        'iropke-4xl': [
          '40px',
          {
            lineHeight: '52px',
            fontWeight: '500',
          },
        ],
        'iropke-3xl': [
          '32px',
          {
            lineHeight: '48px',
            fontWeight: '500',
          },
        ],
        'iropke-2xl': [
          '24px',
          {
            lineHeight: '40px',
            fontWeight: '500',
          },
        ],
        'iropke-xl': [
          '20px',
          {
            lineHeight: '28px',
            fontWeight: '500',
          },
        ],
        'iropke-lg': [
          '16px',
          {
            lineHeight: '26px',
            fontWeight: '500',
          },
        ],
        'iropke-md': [
          '14px',
          {
            lineHeight: '24px',
            fontWeight: '500',
          },
        ],
        'iropke-xs': [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '500',
          },
        ],
      },
      colors: {
        'black-100': '#787878',
        'black-200': '#6B6B6B',
        'black-300': '#5E5E5E',
        'black-400': '#525252',
        'black-500': '#454545',
        'black-600': '#373737',
        'black-700': '#2B2B2B',
        'black-800': '#1F1F1F',
        'black-900': '#121212',
        'black-950': '#050505',
        'blue-100': '#FFFFFF',
        'blue-200': '#ECEFF4',
        'blue-300': '#CBD3E1',
        'blue-400': '#ABB8CE',
        'blue-500': '#8B9DBC',
        'blue-600': '#6A82A9',
        'blue-700': '#52698E',
        'blue-800': '#40516E',
        'blue-900': '#2D394E',
        'blue-950': '#1A212D',
        'gray-100': '#DEDEDE',
        'gray-200': '#C4C4C4',
        'gray-300': '#ABABAB',
        'gray-400': '#919191',
        'background-100': '#F5F7FA',
        'state-error': '#FF6577',
        'line-100': '#F2F2F2',
        'line-200': '#CFDBEA',
        'illust-yellow': '#FBC85B',
        'illust-green': '#48BB98',
        'illust-purple': '#8E80E3',
        'illust-blue': '#5195EE',
        'illust-red': '#E46E80',
        'illust-brown': '#9A695E',
        'sub-yellow': '#E8AA26',
        'sub-blue_1': '#3E3E3E',
        'sub-blue_2': '#3E414D',
        'sub-blue_3': '#494D59',
        'sub-gray_1': '#C7D1E0',
        'sub-gray_2': '#E3E9F1',
        'sub-gray_3': '#EFF3F8',
      },
    },
  },
  plugins: [],
};
