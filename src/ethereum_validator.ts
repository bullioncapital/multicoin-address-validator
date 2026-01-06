import jsSha3 from "js-sha3";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

const verifyEthChecksum = (address: string) => {
	// Check each case
	const addrNoPrefix = address.replace("0x", "");
	const hashBytes = jsSha3.keccak_256(addrNoPrefix.toLowerCase());

	for (let i = 0; i < 40; i++) {
		const char = addrNoPrefix[i];
		const hashVal = Number.parseInt(hashBytes[i], 16);

		// Digits (0-9) are case-insensitive per EIP-55, so they always pass
		if (/[0-9]/.test(char)) {
			// Digits can be in any case, so no validation needed
			continue;
		}

		// For hex letters (a-f, A-F), check the case based on hash
		// If hash value > 7, character should be uppercase
		// If hash value <= 7, character should be lowercase
		if (hashVal > 7 && char.toUpperCase() !== char) {
			return false;
		}
		if (hashVal <= 7 && char.toLowerCase() !== char) {
			return false;
		}
	}

	return true;
};

const isValidAddress = (address: string, _currency?: Currency | string, _opts?: CurrencyOpts) => {
	// Basic format validation: must start with 0x and have exactly 40 hex characters
	if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
		return false;
	}

	// All lowercase or all uppercase addresses are always valid (no checksum)
	if (/^0x[0-9a-f]{40}$/.test(address) || /^0x[0-9A-F]{40}$/.test(address)) {
		return true;
	}

	// For mixed case addresses, validate the checksum according to EIP-55
	// Addresses with invalid checksums should be rejected
	return verifyEthChecksum(address);
};

// Export named function for backward compatibility with usdt_validator
export const ethValidator = isValidAddress;

export default {
	isValidAddress,
	verifyChecksum: verifyEthChecksum,
};
