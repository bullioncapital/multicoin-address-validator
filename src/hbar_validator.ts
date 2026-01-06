import type { Currency, CurrencyOpts } from "./types/currency.ts";

const isValidAddress = (address: string, _currency?: Currency | string, _opts?: CurrencyOpts) => {
	// Basic account ID format: "shard.realm.account" (e.g., "0.0.12345")
	const basicRegex = /^\d+\.\d+\.\d+$/;

	// Checksum format (HIP-15): "shard.realm.account-checksum" (e.g., "0.0.12345-abcde")
	const checksumRegex = /^\d+\.\d+\.\d+-[a-z]{5}$/;

	// EVM address format: "0.0.<40-hex-chars>" (e.g., "0.0.b794f5ea0ba39494ce839613fffba74279579268")
	const evmRegex = /^0\.0\.[0-9a-fA-F]{40}$/;

	// Check if it matches any valid format
	if (basicRegex.test(address)) {
		// Basic format: validate each part is a non-negative integer
		const [shard, realm, account] = address.split(".").map(Number);
		return (
			Number.isInteger(shard) &&
			shard >= 0 &&
			Number.isInteger(realm) &&
			realm >= 0 &&
			Number.isInteger(account) &&
			account >= 0
		);
	}

	if (checksumRegex.test(address)) {
		// Checksum format: validate the numeric part
		const [numericPart] = address.split("-");
		const [shard, realm, account] = numericPart.split(".").map(Number);
		return (
			Number.isInteger(shard) &&
			shard >= 0 &&
			Number.isInteger(realm) &&
			realm >= 0 &&
			Number.isInteger(account) &&
			account >= 0
		);
	}

	if (evmRegex.test(address)) {
		// EVM format is valid if it matches the pattern
		return true;
	}

	return false;
};

const verifyChecksum = (address: string) => {
	// Hedera addresses don't have a checksum in the traditional sense
	// The format validation is the checksum
	return isValidAddress(address);
};

export default {
	isValidAddress,
	verifyChecksum,
};
