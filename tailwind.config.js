const base = require('./src/lib/frontend-library/tailwind.config')

export default {
  corePlugins: {
    preflight: false
  },
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...base.theme.extend,
      lineHeight: {
        16: '4rem'
      }
    },
    textColor: theme => ({
      ...base.theme.textColor(theme)
    }),
    backgroundColor: theme => ({
      ...base.theme.backgroundColor(theme)
    }),
    borderColor: theme => ({
      ...base.theme.borderColor(theme)
    })
  },
  plugins: []
}
