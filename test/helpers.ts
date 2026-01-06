import { expect } from "vitest";
import type { AddressTypes, CurrencyOpts } from "../src/types/currency.ts";
import { validate } from "../src/wallet_address_validator.ts";

export function valid(address: string, currency: string, opts?: CurrencyOpts | AddressTypes) {
	const result = validate(address, currency, opts);
	expect(result).toBe(true);
}

export function invalid(address: string, currency?: string, opts?: CurrencyOpts | AddressTypes) {
	const result = validate(address, currency, opts);
	expect(result).toBe(false);
}

export function commonTests(currency: string) {
	commonTestsWithoutBase58Addresses(currency);
	invalid("1A1zP1ePQGefi2DMPTifTL5SLmv7DivfNa", currency); //reject invalid address
	invalid("1A1zP1ePQGefi2DMPTifTL5SLmv7DivfNa", currency, "testnet"); //reject invalid address
}

export function commonTestsWithoutBase58Addresses(currency: string) {
	invalid("", currency); //reject blank
	invalid("%%@", currency); //reject invalid base58 string
	invalid("bd839e4f6fadb293ba580df5dea7814399989983", currency); //reject transaction id's
	//testnet
	invalid("", currency, "testnet"); //reject blank
	invalid("%%@", currency, "testnet"); //reject invalid base58 string
	invalid("bd839e4f6fadb293ba580df5dea7814399989983", currency, "testnet"); //reject transaction id's
}
