import { decodeBase58 } from "jsr:@std/encoding/base58";
import cbor from "cbor-js";
import CRC from "crc";
import { isValidAddress as isValidAddressShelley } from "./bip173_validator.ts";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

function getDecoded(address: string) {
	try {
		const decoded = decodeBase58(address);
		return cbor.decode(new Uint8Array(decoded).buffer);
	} catch (_e) {
		// if decoding fails, assume invalid address
		return null;
	}
}

function isValidAddressV1(address: string) {
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

const isValidAddress = (
	address: string,
	currency: Currency,
	opts: CurrencyOpts = {},
) => {
	return (
		isValidAddressV1(address) || isValidAddressShelley(address, currency, opts)
	);
};

export { isValidAddress };

const verifyChecksum = (address: string) => {
	// ADA checksum is validated as part of address validation
	// For Byron addresses, CRC32 is checked
	// For Shelley addresses, bech32 checksum is validated
	return isValidAddress(address, undefined, {});
};

export default {
	isValidAddress,
	verifyChecksum,
};
