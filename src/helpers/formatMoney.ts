import accounting from 'accounting'
import getSymbolFromCurrency from 'currency-symbol-map'
import Aurora from '../Aurora'

accounting.settings.currency.format = {
  pos: '%s\xA0%v',
  neg: '-\xA0%s\xA0%v',
  zero: '%s\xA0%v',
}

type FormatMoneyOptions = {
  currency?: string
  truncateCentsIfZero?: boolean
}

const formatMoney = (amount: number, { currency, truncateCentsIfZero }: FormatMoneyOptions = {}) => {
  const { thousandSeparator, decimalSeparator } = Aurora.localeConfig.number
  const symbol = getSymbolFromCurrency(currency || 'ARS')

  const hideCents = !!truncateCentsIfZero && Number.isInteger(amount)

  return accounting.formatMoney(amount, symbol, hideCents ? 0 : 2, thousandSeparator, decimalSeparator)
}

export default formatMoney
