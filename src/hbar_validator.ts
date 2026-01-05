import type { Currency, CurrencyOpts } from "./types/currency.ts";

const isValidAddress = (
	address: string,
	_currency?: Currency | string,
	_opts?: CurrencyOpts,
) => {
	// Regex to match the format "shard.realm.account" (e.g., "0.0.12345")
	const regex = /^\d+\.\d+\.\d+$/;

	if (!regex.test(address)) {
		return false;
	}

	// Split the address into shard, realm, and account parts
	const [shard, realm, account] = address.split(".").map(Number);

	// Validate each part is a non-negative integer
	return (
		Number.isInteger(shard) &&
		shard >= 0 &&
		Number.isInteger(realm) &&
		realm >= 0 &&
		Number.isInteger(account) &&
		account >= 0
	);
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
