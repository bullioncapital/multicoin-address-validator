import { describe, it } from "vitest";
import { commonTests, invalid, valid } from "./helpers.ts";

describe("WAValidator - Hedera (HBAR)", () => {
	describe("valid results", () => {
		it("should return true for correct hbar account ID addresses", () => {
			// Basic account ID format: shard.realm.account
			valid("0.0.12345", "hbar");
			valid("0.0.987654321", "hbar");
			valid("0.1.54321", "hbar");
			valid("1.0.123", "hbar");
			valid("2.3.45678", "hedera");
			valid("0.2.789", "hedera");
			valid("0.0.1", "hedera");
			valid("10.5.987", "hedera");
		});

		it("should return true for checksum addresses (HIP-15)", () => {
			// Checksum format: shard.realm.account-checksum (5 lowercase letters)
			valid("0.0.12345-abcde", "hbar");
			valid("0.0.987654321-vfmkw", "hbar");
			valid("0.1.54321-lpjmk", "hedera");
		});

		it("should return true for EVM-compatible addresses", () => {
			// EVM format: 0.0.<40-hex-chars>
			valid("0.0.b794f5ea0ba39494ce839613fffba74279579268", "hbar");
			valid("0.0.a43c7f27e36279645bd1620070414e564ec291a9", "hedera");
			valid("0.0.0000000000000000000000000000000000001234", "hbar");
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect hbar addresses", () => {
			commonTests("hedera");
			commonTests("hbar");

			// Invalid checksum format (not 5 lowercase letters)
			invalid("0.0.12345-abcxyz", "hbar"); // 6 letters
			invalid("0.1.54321-z9lpq", "hbar"); // contains number
			invalid("0.0.12345-ABCDE", "hbar"); // uppercase
			invalid("0.0.12345-abc", "hbar"); // only 3 letters

			// Invalid account ID format
			invalid("hbar123", "hbar");
			invalid("0.0", "hbar");
			invalid("0.0.", "hbar");
			invalid("..123", "hbar");
			invalid("0-0-12345", "hbar");

			// Invalid EVM format
			invalid("0.0.b794f5ea0ba39494ce839613fffba742795792", "hbar"); // too short
			invalid("0.0.g794f5ea0ba39494ce839613fffba74279579268", "hbar"); // invalid hex char
			invalid("1.0.b794f5ea0ba39494ce839613fffba74279579268", "hbar"); // wrong shard

			// Other crypto addresses
			invalid("0xb794f5ea0ba39494ce839613fffba74279579268", "hbar");
			invalid("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", "hbar");
		});
	});
});
