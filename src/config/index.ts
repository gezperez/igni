import Config from 'react-native-config'
import { camelCase, keys, mapKeys, pick } from 'lodash'

import base from './base'

let envConfig = {}

switch (Config.ENVIROMENT) {
  case 'development':
    if (Config.LOCAL === 'true') {
      envConfig = require('./development.local').default
    } else {
      envConfig = require('./development').default
    }
    break
  default:
    envConfig = {}
}

// @ts-ignore
const envKeys = keys(Config.getConstants())
const envVariables = mapKeys(pick(Config, envKeys), (_, key) => camelCase(key))

export default Object.freeze({
  ...base,
  ...envVariables,
  ...envConfig,
})
