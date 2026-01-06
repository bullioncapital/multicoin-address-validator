import { base58, hex } from "@scure/base";
import segwit from "./crypto/segwit_addr.ts";
import { sha256Checksum } from "./crypto/sha256.ts";
import type { Currency, CurrencyOpts } from "./types/currency.ts";

const decodeBase58 = (address: string): Uint8Array => {
	return base58.decode(address);
};

const DEFAULT_NETWORK_TYPE = "prod";

function isSegwitAddressValid(
	address: string,
	currency: Currency,
	opts: CurrencyOpts = {},
): boolean {
	if (!currency.bech32Hrp) {
		return false;
	}

	const { networkType = DEFAULT_NETWORK_TYPE } = opts;

	let correctBech32Hrps: string[];
	if (currency.bech32Hrp && (networkType === "prod" || networkType === "testnet")) {
		correctBech32Hrps = currency.bech32Hrp[networkType];
	} else if (currency.bech32Hrp) {
		correctBech32Hrps = currency.bech32Hrp.prod.concat(currency.bech32Hrp.testnet);
	} else {
		return false;
	}

	for (const chrp of correctBech32Hrps) {
		const ret = segwit.decode(chrp, address);
		if (ret) {
			return segwit.encode(chrp, ret.version, ret.program) === address.toLowerCase();
		}
	}

	return false;
}

function getDecoded(address: string) {
	try {
		return decodeBase58(address);
	} catch (_e) {
		// if decoding fails, assume invalid address
		return null;
	}
}

function getAddressType(address: string, currency: Currency) {
	currency = currency || {};
	// should be 25 bytes per btc address spec and 26 decred
	const expectedLength = currency.expectedLength || 25;
	const decoded = getDecoded(address);

	if (decoded) {
		const length = decoded.length;

		if (length !== expectedLength) {
			return null;
		}

		if (currency.regex) {
			if (!currency.regex.test(address)) {
				return false;
			}
		}

		const checksum = hex.encode(decoded.slice(length - 4, length)),
			body = hex.encode(decoded.slice(0, length - 4)),
			goodChecksum = sha256Checksum(body);

		return checksum === goodChecksum ? hex.encode(decoded.slice(0, expectedLength - 24)) : null;
	}

	return null;
}

function isValidP2PKHandP2SHAddress(
	address: string,
	currency: Currency,
	opts: CurrencyOpts,
): boolean {
	const { networkType = DEFAULT_NETWORK_TYPE } = opts;

	let correctAddressTypes: string[];
	const addressType = getAddressType(address, currency);

	if (currency.addressTypes && addressType) {
		if (networkType === "prod" || networkType === "testnet") {
			correctAddressTypes = currency.addressTypes[networkType];
		} else if (currency.addressTypes) {
			correctAddressTypes = currency.addressTypes.prod.concat(currency.addressTypes.testnet);
		} else {
			return false;
		}

		return correctAddressTypes.indexOf(addressType) >= 0;
	}

	return false;
}

const isValidBitcoinAddress = (
	address: string,
	currency?: Currency | string,
	opts?: CurrencyOpts,
) => {
	if (!currency || typeof currency === "string") {
		return false;
	}
	const currencyOpts = opts || {};
	return (
		isValidP2PKHandP2SHAddress(address, currency, currencyOpts) ||
		isSegwitAddressValid(address, currency, currencyOpts)
	);
};

export { isValidBitcoinAddress };

const verifyChecksum = (address: string) => {
	// Bitcoin checksum is validated as part of address validation
	// This is a simplified checksum verification
	try {
		const decoded = getDecoded(address);
		if (!decoded) return false;
		const length = decoded.length;
		const expectedLength = 25; // Default Bitcoin address length
		if (length !== expectedLength) return false;

		const checksum = hex.encode(decoded.slice(length - 4, length));
		const body = hex.encode(decoded.slice(0, length - 4));
		const goodChecksum = sha256Checksum(body);

		return checksum === goodChecksum;
	} catch {
		return false;
	}
};

export default {
	isValidAddress: isValidBitcoinAddress,
	verifyChecksum,
};
