import { base58 } from "@scure/base";
import ETHValidator from "./ethereum_validator.ts";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

const decodeBase58 = (address: string): Uint8Array => {
	return base58.decode(address);
};

// Simple base58 validator for Solana addresses. Just checks if it can be decoded.
const isValidSolanaAddress = (address: string, currency: Currency) => {
	try {
		if (!address || address.length === 0) {
			return false;
		}

		if (currency.minLength && address.length < currency.minLength) {
			return false;
		}

		if (currency.maxLength && address.length > currency.maxLength) {
			return false;
		}
		try {
			const decoded = decodeBase58(address);
			if (!decoded || !decoded.length) {
				return false;
			}
		} catch (_e) {
			// if decoding fails, assume invalid address
			return false;
		}
		return true;
	} catch (_e) {
		return false;
	}
};

const solanaValidator = (address: string, currency: Currency) =>
	isValidSolanaAddress(address, {
		...currency,
		maxLength: 44,
		minLength: 43,
	});

function checkAllValidators(
	address: string,
	currency: Currency,
	networkType: CurrencyOpts,
): boolean {
	return (
		ETHValidator.isValidAddress(address, currency, networkType) ||
		solanaValidator(address, currency)
	);
}

export default {
	isValidAddress: (address: string, currency?: Currency | string, opts?: CurrencyOpts) => {
		const currencyOpts = opts || {};
		if (currencyOpts?.chainType) {
			switch (currencyOpts.chainType) {
				case "arbitrum":
				case "avalanche":
				case "erc20":
				case "ethereum":
				case "polygon":
				case "sonic":
					return ETHValidator.isValidAddress(address, currency, currencyOpts);
				case "solana":
					if (!currency || typeof currency === "string") {
						return false;
					}
					return solanaValidator(address, currency);
			}
		}
		if (!currency || typeof currency === "string") {
			return false;
		}
		return checkAllValidators(address, currency, currencyOpts);
	},
	verifyChecksum: (address: string) => {
		// Try ETH first, then Solana
		return ETHValidator.verifyChecksum?.(address) || false;
	},
};
