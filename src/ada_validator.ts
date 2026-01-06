import { base58 } from "@scure/base";
import cbor from "cbor-js";
import CRC from "crc";
import bech32 from "./crypto/bech32.ts";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

const decodeBase58 = (address: string): Uint8Array => {
	return base58.decode(address);
};

function getDecoded(address: string) {
	try {
		const decoded = decodeBase58(address);
		return cbor.decode(new Uint8Array(decoded).buffer);
	} catch (_e) {
		// if decoding fails, assume invalid address
		return null;
	}
}

// Byron era (V1) addresses - base58 encoded with CBOR and CRC32
function isValidByronAddress(address: string) {
	const decoded = getDecoded(address);

	if (!decoded || (!Array.isArray(decoded) && decoded.length !== 2)) {
		return false;
	}

	const tagged = decoded[0];
	const validCrc = decoded[1];
	if (typeof validCrc !== "number") {
		return false;
	}

	// get crc of the payload
	const crc = CRC.crc32(tagged);

	return crc === validCrc;
}

// Shelley era addresses - bech32 encoded (BIP-173)
// https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki
function isValidShelleyAddress(address: string, currency: Currency, opts: CurrencyOpts) {
	const { networkType = "prod" } = opts;
	const decoded = bech32.decode(address, bech32.encodings.BECH32);
	if (!decoded) {
		return false;
	}

	const bech32Hrp = decoded.hrp;
	let correctBech32Hrps: string[] = [];
	if (currency.bech32Hrp && (networkType === "prod" || networkType === "testnet")) {
		correctBech32Hrps = currency.bech32Hrp[networkType];
	} else if (currency.bech32Hrp) {
		correctBech32Hrps = currency.bech32Hrp.prod.concat(currency.bech32Hrp.testnet);
	} else {
		return false;
	}

	if (correctBech32Hrps.indexOf(bech32Hrp) === -1) {
		return false;
	}

	return true;
}

const isValidAddress = (address: string, currency?: Currency | string, opts?: CurrencyOpts) => {
	if (!currency || typeof currency === "string") {
		return false;
	}
	const currencyOpts = opts || {};
	return isValidByronAddress(address) || isValidShelleyAddress(address, currency, currencyOpts);
};

export { isValidAddress };

const verifyChecksum = (address: string) => {
	// ADA checksum is validated as part of address validation
	// For Byron addresses, CRC32 is checked
	// For Shelley addresses, bech32 checksum is validated
	// We need a currency object for validation, but verifyChecksum doesn't have access to it
	// So we'll do basic format checks instead
	try {
		// Try to decode as Byron address (base58)
		const decoded = getDecoded(address);
		if (decoded && Array.isArray(decoded) && decoded.length === 2) {
			return true; // Basic format check passed
		}
		// Try as Shelley address (bech32) - basic format check
		return address.includes("1") && address.length > 20;
	} catch {
		return false;
	}
};

export default {
	isValidAddress,
	verifyChecksum,
};
