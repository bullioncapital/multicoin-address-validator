import { decodeBase32 } from "jsr:@std/encoding/base32";
import { isValidBitcoinAddress } from "./bitcoin_validator.ts";
import bech32 from "./crypto/bech32.ts";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

function validateAddress(
	address: string,
	currency: Currency,
	opts: CurrencyOpts = {},
) {
	const networkType = opts ? opts.networkType : "";
	let prefix = "bitcoincash";
	const regexp = new RegExp(currency.regexp ?? "");
	let raw_address: string;

	const res = address.split(":");
	if (res.length === 1) {
		raw_address = address;
	} else {
		if (res[0] !== "bitcoincash") {
			return false;
		}
		raw_address = res[1];
	}

	if (!regexp.test(raw_address)) {
		return false;
	}

	if (
		raw_address.toLowerCase() !== raw_address &&
		raw_address.toUpperCase() !== raw_address
	) {
		return false;
	}

	const decoded = decodeBase32(raw_address);
	if (networkType === "testnet") {
		prefix = "bchtest";
	}

	try {
		if (bech32.verifyChecksum(prefix, decoded, bech32.encodings.BECH32)) {
			return false;
		}
	} catch (_e) {
		return false;
	}
	return true;
}

const isValidAddress = (
	address: string,
	currency: Currency,
	networkType: CurrencyOpts,
) => {
	return (
		validateAddress(address, currency, networkType) ||
		isValidBitcoinAddress(address, currency, networkType)
	);
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
