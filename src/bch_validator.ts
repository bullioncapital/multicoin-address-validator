import { isValidBitcoinAddress } from "./bitcoin_validator.ts";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

// CashAddr charset (BCH uses a custom base32 variant)
const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const CHARSET_INVERSE_MAP = new Map<string, number>();
for (let i = 0; i < CHARSET.length; i++) {
	CHARSET_INVERSE_MAP.set(CHARSET[i], i);
}

// Polymod for CashAddr checksum validation (uses BigInt for 40-bit arithmetic)
function polymod(values: number[]): bigint {
	const GENERATOR = [0x98f2bc8e61n, 0x79b76d99e2n, 0xf33e5fb3c4n, 0xae2eabe2a8n, 0x1e4f43e470n];
	let checksum = 1n;

	for (const value of values) {
		const topBits = checksum >> 35n;
		checksum = ((checksum & 0x07ffffffffn) << 5n) ^ BigInt(value);

		for (let j = 0; j < GENERATOR.length; j++) {
			if ((topBits >> BigInt(j)) & 1n) {
				checksum ^= GENERATOR[j];
			}
		}
	}

	return checksum ^ 1n;
}

// Convert prefix string to polymod input values
function prefixToValues(prefix: string): number[] {
	const result: number[] = [];
	for (let i = 0; i < prefix.length; i++) {
		result.push(prefix.charCodeAt(i) & 0x1f);
	}
	result.push(0);
	return result;
}

// Validate CashAddr format
function isValidCashAddr(address: string): boolean {
	// Remove prefix if present
	let prefix = 'bitcoincash';
	let payload = address;

	if (address.includes(':')) {
		const parts = address.split(':');
		if (parts.length !== 2) return false;
		prefix = parts[0].toLowerCase();
		payload = parts[1];

		// Valid prefixes
		if (prefix !== 'bitcoincash' && prefix !== 'bchtest' && prefix !== 'bchreg') {
			return false;
		}
	}

	// Convert to lowercase for validation
	payload = payload.toLowerCase();

	// CashAddr addresses should be 42 characters (excluding prefix)
	if (payload.length !== 42) return false;

	// First character should be q, p (for mainnet)
	const firstChar = payload[0];
	if (firstChar !== 'q' && firstChar !== 'p') {
		// Allow testnet addresses too
		if (prefix === 'bchtest' || prefix === 'bchreg') {
			// Testnet can start with other characters too
		} else {
			return false;
		}
	}

	// Decode payload
	const decoded: number[] = [];
	for (let i = 0; i < payload.length; i++) {
		const val = CHARSET_INVERSE_MAP.get(payload[i]);
		if (val === undefined) return false;
		decoded.push(val);
	}

	// Verify checksum
	const prefixValues = prefixToValues(prefix);
	const checksum = polymod([...prefixValues, ...decoded]);

	return checksum === 0n;
}

const isValidAddress = (address: string, currency?: Currency | string, opts?: CurrencyOpts) => {
	if (!currency || typeof currency === "string") {
		return false;
	}
	const currencyOpts = opts || {};

	// Try to validate as BCH CashAddr format
	if (isValidCashAddr(address)) {
		return true;
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
