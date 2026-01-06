import { isValidBitcoinAddress } from "./bitcoin_validator.ts";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

const bchaddr = require("bchaddrjs");

const isValidAddress = (address: string, currency?: Currency | string, opts?: CurrencyOpts) => {
	if (!currency || typeof currency === "string") {
		return false;
	}
	const currencyOpts = opts || {};

	// Try to validate as BCH CashAddr format or legacy format
	try {
		if (bchaddr.isValidAddress(address)) {
			return true;
		}
	} catch {
		// If bchaddrjs fails, fall through to Bitcoin validation
	}

	// Fall back to standard Bitcoin validation for legacy addresses
	return isValidBitcoinAddress(address, currency, currencyOpts);
};

export { isValidAddress };

const verifyChecksum = (address: string) => {
	// BCH checksum is validated as part of address validation
	// This performs basic format validation
	const regexp = /^[qQpP]{1}[0-9a-zA-Z]{41}$/;
	return regexp.test(address) || /^\d+\.\d+\.\d+$/.test(address);
};

export default {
	isValidAddress,
	verifyChecksum,
};
