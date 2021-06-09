import accounting from 'accounting'

import Aurora from '../Aurora'

const formatNumber = (number: number, precision: number): string => {
  const { thousandSeparator, decimalSeparator } = Aurora.localeConfig.number

  return accounting.formatNumber(number, precision, thousandSeparator, decimalSeparator)
}

export default formatNumber
