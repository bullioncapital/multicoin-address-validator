import { getAll, getByNameOrSymbol } from "./currencies.ts";
import { AddressTypes, CurrencyOpts } from "./types/currency.ts";

const DEFAULT_CURRENCY_NAME = "bitcoin";

const validate = (
  address: string,
  currencyNameOrSymbol?: string,
  opts?: CurrencyOpts | AddressTypes,
) => {
  const currency = getByNameOrSymbol(
    currencyNameOrSymbol || DEFAULT_CURRENCY_NAME,
  );

  if (currency && currency.validator) {
    if (opts && typeof opts === "string") {
      return currency.validator.isValidAddress(address, currency, {
        networkType: opts,
      });
    }
    return currency.validator.isValidAddress(address, currency, opts);
  }

  throw new Error("Missing validator for currency: " + currencyNameOrSymbol);
};

const getCurrencies = () => {
  return getAll();
};

const findCurrency = (symbol: string) => {
  return getByNameOrSymbol(symbol) || null;
};

export { findCurrency, getCurrencies, validate };
