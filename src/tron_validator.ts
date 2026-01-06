import { createHash } from "node:crypto";
import { base58 } from "@scure/base";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

const sha256 = (buffer: Uint8Array): Uint8Array => {
	return new Uint8Array(createHash("sha256").update(buffer).digest());
};

const isValidTronAddress = (address: string, _networkType?: string): boolean => {
	try {
		// Tron addresses should be 34 characters and start with T
		// Both mainnet and testnet use the same address format
		if (!address.startsWith("T") || address.length !== 34) {
			return false;
		}

		// Decode base58
		const decoded = base58.decode(address);

		// Should be 25 bytes: 1 byte version + 20 bytes address + 4 bytes checksum
		if (decoded.length !== 25) {
			return false;
		}

		// Verify version byte is 0x41 for Tron mainnet addresses
		if (decoded[0] !== 0x41) {
			return false;
		}

		// Split into address and checksum
		const payload = decoded.slice(0, 21);
		const checksum = decoded.slice(21);

		// Verify checksum: double SHA256 of payload, take first 4 bytes
		const hash = sha256(sha256(payload));
		const expectedChecksum = hash.slice(0, 4);

		// Compare checksums
		return checksum.every((byte, index) => byte === expectedChecksum[index]);
	} catch {
		return false;
	}
};

const isValidAddress = (address: string, _currency?: Currency | string, opts?: CurrencyOpts) => {
	const currencyOpts = opts || {};
	const networkType = currencyOpts.networkType;

	return isValidTronAddress(address, networkType);
};

const verifyChecksum = (address: string) => {
	return isValidTronAddress(address);
};

export default {
	isValidAddress,
	verifyChecksum,
};
