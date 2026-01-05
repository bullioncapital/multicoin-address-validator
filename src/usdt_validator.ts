import { isValidBitcoinAddress } from "./bitcoin_validator.ts";
import { ethValidator } from "./ethereum_validator.ts";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

function checkAllValidators(
	address: string,
	currency: Currency,
	opts: CurrencyOpts,
) {
	return (
		isValidBitcoinAddress(address, currency, opts) ||
		ethValidator(address, currency, opts)
	);
}

const isValidAddress = (
	address: string,
	currency: Currency,
	opts: CurrencyOpts,
) => {
	if (opts) {
		const chainType = opts.chainType ? opts.chainType.toLowerCase() : "";
		switch (chainType) {
			case "erc20":
			case "ethereum":
				return ethValidator(address, currency, opts);
			case "omni":
				return isValidBitcoinAddress(address, currency, opts);
		}
	}
	return checkAllValidators(address, currency, opts);
};

export default {
	isValidAddress,
	verifyChecksum: (address: string) => {
		// Try ETH first, then Bitcoin
		return ethValidator(address, undefined, {}) || false;
	},
};
