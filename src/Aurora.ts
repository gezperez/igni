import { get } from 'lodash'

type LocalizedConfig = {
  number: {
    decimalSeparator: string
    thousandSeparator: string
  }
  titleCaseIgnoreWords: string[]
}

type UpdateLocalizedConfig = {
  number?: {
    decimalSeparator: string
    thousandSeparator: string
  }
  titleCaseIgnoreWords?: string[]
}

const config = {
  locale: 'es',
}

const localeConfig: Record<string, LocalizedConfig> = {
  es: {
    number: {
      decimalSeparator: ',',
      thousandSeparator: '.',
    },
    titleCaseIgnoreWords: [
      'a',
      'ante',
      'bajo',
      'cabe',
      'con',
      'contra',
      'de',
      'del',
      'desde',
      'durante',
      'en',
      'entre',
      'hacia',
      'hasta',
      'mediante',
      'para',
      'por',
      'según',
      'sin',
      'so',
      'sobre',
      'tras',
      'versus',
      'vía',
    ],
  },
  en: {
    number: {
      decimalSeparator: '.',
      thousandSeparator: ',',
    },
    titleCaseIgnoreWords: ['but', 'by', 'of', 'off', 'out', 'to', 'the', 'up'],
  },
}

export default {
  localeConfig: {
    get number() {
      const numberLocaleConfig = get(localeConfig, config.locale, localeConfig.es)

      return numberLocaleConfig.number
    },
    get titleCaseIgnoreWords() {
      const selectedLocaleConfig = get(localeConfig, config.locale, localeConfig.es)

      return selectedLocaleConfig.titleCaseIgnoreWords
    },
  },
  setLocale(locale: string) {
    config.locale = locale
  },
  getLocale() {
    return config.locale
  },
  updateLocale(locale: string, localizedConfig: UpdateLocalizedConfig) {
    localeConfig[locale] = {
      ...localeConfig[locale],
      ...localizedConfig,
    }
  },
}
