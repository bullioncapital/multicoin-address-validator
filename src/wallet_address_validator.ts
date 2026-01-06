import { getAll, getByNameOrSymbol } from "./currencies.ts";
import ETHValidator from "./ethereum_validator.ts";
import TronValidator from "./tron_validator.ts";
import type { AddressTypes, CurrencyOpts } from "./types/currency.ts";

const DEFAULT_CURRENCY_NAME = "bitcoin";

const validate = (
	address: string,
	currencyNameOrSymbol?: string,
	opts?: CurrencyOpts | AddressTypes,
) => {
	const currency = getByNameOrSymbol(currencyNameOrSymbol || DEFAULT_CURRENCY_NAME);

	if (currency?.validator) {
		if (opts && typeof opts === "string") {
			return currency.validator.isValidAddress(address, currency, {
				networkType: opts,
			});
		}
		return currency.validator.isValidAddress(address, currency, opts);
	}

	// Handle unknown currencies with chainType option
	if (opts && typeof opts === "object" && opts.chainType) {
		const chainType = opts.chainType.toLowerCase();
		if (chainType === "tron") {
			return TronValidator.isValidAddress(address, currency, opts);
		}
		if (
			chainType === "ethereum" ||
			chainType === "erc20" ||
			chainType === "arbitrum" ||
			chainType === "avalanche" ||
			chainType === "polygon" ||
			chainType === "sonic"
		) {
			return ETHValidator.isValidAddress(address, currency, opts);
		}
	}

	return false;
};

const getCurrencies = () => {
	return getAll();
};

const findCurrency = (symbol: string) => {
	return getByNameOrSymbol(symbol) || null;
};

export { findCurrency, getCurrencies, validate };
