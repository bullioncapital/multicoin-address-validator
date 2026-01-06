import { isValidBitcoinAddress } from "./bitcoin_validator.ts";
import { ethValidator } from "./ethereum_validator.ts";
import TronValidator from "./tron_validator.ts";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

function checkAllValidators(address: string, currency: Currency, opts: CurrencyOpts) {
	return (
		isValidBitcoinAddress(address, currency, opts) ||
		ethValidator(address, currency, opts) ||
		TronValidator.isValidAddress(address, currency, opts)
	);
}

const isValidAddress = (address: string, currency?: Currency | string, opts?: CurrencyOpts) => {
	const currencyOpts = opts || {};
	if (currencyOpts?.chainType) {
		const chainType = currencyOpts.chainType.toLowerCase();
		switch (chainType) {
			case "erc20":
			case "ethereum":
			case "arbitrum":
			case "avalanche":
			case "polygon":
				return ethValidator(address, currency, currencyOpts);
			case "tron":
				if (!currency || typeof currency === "string") {
					return false;
				}
				return TronValidator.isValidAddress(address, currency, currencyOpts);
			case "omni":
				if (!currency || typeof currency === "string") {
					return false;
				}
				return isValidBitcoinAddress(address, currency, currencyOpts);
		}
	}
	if (!currency || typeof currency === "string") {
		return false;
	}
	return checkAllValidators(address, currency, currencyOpts);
};

export default {
	isValidAddress,
	verifyChecksum: (address: string) => {
		// Try ETH first, then Bitcoin
		return ethValidator(address, undefined, {}) || false;
	},
};
