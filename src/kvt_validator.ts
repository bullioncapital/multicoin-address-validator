import ETHValidator from "./ethereum_validator.ts";
import XLMValidator from "./stellar_validator.ts";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

function checkAllValidators(address: string, currency: Currency, opts: CurrencyOpts): boolean {
	return (
		ETHValidator.isValidAddress(address, currency, opts) || XLMValidator.isValidAddress(address)
	);
}

const isValidAddress = (address: string, currency?: Currency | string, opts?: CurrencyOpts) => {
	const currencyOpts = opts || {};
	if (currencyOpts?.chainType) {
		const chainType = currencyOpts.chainType.toLowerCase();
		switch (chainType) {
			case "erc20":
			case "ethereum":
				return ETHValidator.isValidAddress(address, currency, currencyOpts);
			case "stellar":
			case "xlm":
				return XLMValidator.isValidAddress(address);
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
		// Try ETH first, then XLM
		return ETHValidator.verifyChecksum?.(address) || XLMValidator.verifyChecksum(address);
	},
};
