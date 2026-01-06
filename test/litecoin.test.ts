import { describe, it } from "vitest";
import { commonTests, invalid, valid } from "./helpers.ts";

describe("WAValidator - Litecoin (LTC)", () => {
	describe("valid results", () => {
		it("should return true for correct litecoin addresses", () => {
			valid("LVg2kJoFNg45Nbpy53h7Fe1wKyeXVRhMH9", "litecoin");
			valid("LVg2kJoFNg45Nbpy53h7Fe1wKyeXVRhMH9", "LTC");
			valid("LTpYZG19YmfvY2bBDYtCKpunVRw7nVgRHW", "litecoin");
			valid("Lb6wDP2kHGyWC7vrZuZAgV7V4ECyDdH7a6", "litecoin");
			valid("mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef", "litecoin", "testnet");

			// p2sh addresses
			valid("3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt", "litecoin");
			valid("2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7", "litecoin", "testnet");
			valid("QW2SvwjaJU8LD6GSmtm1PHnBG2xPuxwZFy", "litecoin", "testnet");
			valid("QjpzxpbLp5pCGsCczMbfh1uhC3P89QZavY", "litecoin", "testnet");

			// segwit addresses
			valid("ltc1qg42tkwuuxefutzxezdkdel39gfstuap288mfea", "litecoin");
			valid("ltc1qg42tkwuuxefutzxezdkdel39gfstuap288mfea", "litecoin", {
				networkType: "prod",
			});
			valid("tltc1qu78xur5xnq6fjy83amy0qcjfau8m367defyhms", "litecoin", {
				networkType: "testnet",
			});
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect litecoin addresses", () => {
			commonTests("litecoin");

			// Invalid Litecoin addresses - wrong prefix (must start with L, M, or ltc1)
			invalid("1VgpqpeFNg45Nbpy53h7Fe1wKyeXVRhMH9", "litecoin");
			invalid("DVgpqpeFNg45Nbpy53h7Fe1wKyeXVRhMH9", "litecoin");

			// Invalid checksum
			invalid("LVg2kJoFNg45Nbpy53h7Fe1wKyeXVRhMH8", "litecoin");
			invalid("LTpYZG19YmfvY2bBDYtCKpunVRw7nVgRHX", "litecoin");

			// Wrong length
			invalid("LVg2kJoFNg45Nbpy53h7Fe1wKyeX", "litecoin");
			invalid("LVg2kJoFNg45Nbpy53h7Fe1wKyeXVRhMH9ABCDEFGH", "litecoin");

			// Invalid SegWit address
			invalid("ltc1qg42tkwuuxefutzxezdkdel39gfstuap288mfeb", "litecoin");
			invalid("btc1qg42tkwuuxefutzxezdkdel39gfstuap288mfea", "litecoin");
			invalid("ltc1qg42tkwuuxefutzxezdkdel39gfstuap288mfez", "litecoin");

			// Testnet address on mainnet
			invalid("mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef", "litecoin", "prod");
			invalid("tltc1qu78xur5xnq6fjy83amy0qcjfau8m367defyhms", "litecoin", "prod");

			// Other crypto addresses
			invalid("0xE37c0D48d68da5c5b14E5c1a9f1CFE802776D9FF", "litecoin");
			invalid("DPpJVPpvPNP6i6tMj4rTycAGh8wReTqaSU", "litecoin");
		});
	});
});
