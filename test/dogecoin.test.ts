import { describe, it } from "vitest";
import { commonTests, invalid, valid } from "./helpers.ts";

describe("WAValidator - Dogecoin (DOGE)", () => {
	describe("valid results", () => {
		it("should return true for correct dogecoin addresses", () => {
			valid("DPpJVPpvPNP6i6tMj4rTycAGh8wReTqaSU", "dogecoin");
			valid("DNzLUN6MyYVS5zf4Xc2yK69V3dXs6Mxia5", "dogecoin");
			valid("DPS6iZj7roHquvwRYXNBua9QtKPzigUUhM", "dogecoin");
			valid("DPS6iZj7roHquvwRYXNBua9QtKPzigUUhM", "DOGE");

			//p2sh addresses
			valid("A7JjzK9k9x5b2MkkQzqt91WZsuu7wTu6iS", "dogecoin");
			valid("2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7", "dogecoin", "testnet");
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect dogecoin addresses", () => {
			commonTests("dogecoin");

			// Invalid Dogecoin addresses - wrong prefix (must start with D or A for multisig)
			invalid("1PpJVPpvPNP6i6tMj4rTycAGh8wReTqaSU", "dogecoin");
			invalid("LPpJVPpvPNP6i6tMj4rTycAGh8wReTqaSU", "dogecoin");

			// Invalid checksum
			invalid("DPpJVPpvPNP6i6tMj4rTycAGh8wReTqaSV", "dogecoin");
			invalid("DNzLUN6MyYVS5zf4Xc2yK69V3dXs6Mxia6", "dogecoin");

			// Wrong length (not 34 chars)
			invalid("DPpJVPpvPNP6i6tMj4rTycAGh8wRe", "dogecoin");
			invalid("DPpJVPpvPNP6i6tMj4rTycAGh8wReTqaSUABCD", "dogecoin");
			invalid("1Wh4bh", "dogecoin");

			// Invalid multisig address
			invalid("A7JjzK9k9x5b2MkkQzqt91WZsuu7wTu6i1", "dogecoin");

			// Other crypto addresses
			invalid("0xE37c0D48d68da5c5b14E5c1a9f1CFE802776D9FF", "dogecoin");
			invalid("bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4", "dogecoin");
			invalid("DF61X3Gn1H8zVeV2QoERgprKAivufsVkA5", "dogecoin");
		});
	});
});
