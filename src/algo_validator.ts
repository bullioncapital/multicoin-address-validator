import { base32nopad } from "@scure/base";
import { sha512_256 } from "js-sha512";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

const ALGORAND_CHECKSUM_BYTE_LENGTH = 4;
const ALGORAND_ADDRESS_LENGTH = 58;
const ALGORAND_PUBLIC_KEY_LENGTH = 32;

const verifyChecksum = (address: string) => {
	if (address.length !== ALGORAND_ADDRESS_LENGTH) {
		return false;
	}
	try {
		// Decode base32 address (without padding)
		const decoded = base32nopad.decode(address);
		if (decoded.length !== ALGORAND_PUBLIC_KEY_LENGTH + ALGORAND_CHECKSUM_BYTE_LENGTH) {
			return false;
		}

		// Split into public key and checksum
		const publicKey = decoded.slice(0, ALGORAND_PUBLIC_KEY_LENGTH);
		const checksum = decoded.slice(-ALGORAND_CHECKSUM_BYTE_LENGTH);

		// Compute SHA-512/256 hash of public key
		const hashHex = sha512_256(publicKey);
		const expectedChecksum = hashHex.slice(-ALGORAND_CHECKSUM_BYTE_LENGTH * 2);

		// Compare checksums
		const actualChecksum = Array.from(checksum)
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("")
			.toLowerCase();

		return expectedChecksum === actualChecksum;
	} catch {
		return false;
	}
};

const isValidAddress = (address: string, _currency?: Currency | string, _opts?: CurrencyOpts) => {
	return verifyChecksum(address);
};

export default {
	isValidAddress,
	verifyChecksum,
};
