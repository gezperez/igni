import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import { formatMoney } from '~/helpers'
import es from './locales/es'

const resources = {
  es,
}
i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
    format(value, format) {
      if (format === 'currency') {
        return formatMoney(value, { truncateCentsIfZero: true })
      }

      return value
    },
  },
})

export default i18n
