import { describe, it } from "vitest";
import { commonTestsWithoutBase58Addresses, invalid, valid } from "./helpers.ts";

describe("WAValidator - Ethereum (ETH)", () => {
	describe("valid results", () => {
		it("should return true for correct Ethereum addresses", () => {
			valid("0xE37c0D48d68da5c5b14E5c1a9f1CFE802776D9FF", "ethereum");
			valid("0xa00354276d2fC74ee91e37D085d35748613f4748", "ethereum");
			valid("0xAff4d6793F584a473348EbA058deb8caad77a288", "ETH");
			valid("0xc6d9d2cd449a754c494264e1809c50e34d64562b", "ETH");
			valid("0x52908400098527886E0F7030069857D2E4169EE7", "ETH");
			valid("0x8617E340B3D01FA5F11F306F4090FD50E238070D", "ETH");
			valid("0xde709f2102306220921060314715629080e2fb77", "ETH");
			valid("0x27b1fdb04752bbc536007a920d24acb045561c26", "ETH");
			valid("0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed", "ETH");
			valid("0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359", "ETH");
			valid("0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB", "ETH");
			valid("0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb", "ETH");
		});

		it("should return true for ERC20 token addresses (same format as ETH)", () => {
			// USDC addresses
			valid("0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB", "usdc");
			valid("0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb", "usdc");

			// YFI addresses
			valid("0xE37c0D48d68da5c5b14E5c1a9f1CFE802776D9FF", "yfi");
			valid("0xa00354276d2fC74ee91e37D085d35748613f4748", "yfi");
			valid("0xAff4d6793F584a473348EbA058deb8caad77a288", "YFI");

			// Unknown tokens with chainType
			valid("0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB", "eurc", {
				chainType: "ethereum",
			});
			valid("0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb", "eurc", {
				chainType: "Ethereum",
			});
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect eip55 addresses", () => {
			invalid("6xAff4d6793F584a473348EbA058deb8caad77a288", "ethereum");
			invalid("0x02fcd51aAbB814FfFe17908fbc888A8975D839A5", "ethereum");
			invalid("0XD1220A0CF47C7B9BE7A2E6BA89F429762E7B9ADB", "ethereum");
			invalid("aFf4d6793f584a473348ebA058deb8caad77a2885", "ethereum");
			invalid("0xff4d6793F584a473", "ethereum");
		});

		it("should return false for incorrect ERC20 token addresses", () => {
			// Invalid for unknown tokens even with chainType
			invalid("833XorXTTx5iya5B3Tr6iqEs9GbRuvVfwyLCP2vpdz", "eurc", {
				chainType: "ethereum",
			});
			invalid("0xDDDDDDD", "eurc", { chainType: "ethereum" });
			invalid("1234567890123", "eurc", { chainType: "Ethereum" });

			// Invalid for known ERC20 tokens
			commonTestsWithoutBase58Addresses("usdc");
			commonTestsWithoutBase58Addresses("yfi");
		});

		it("should return false for incorrect ethereum addresses", () => {
			commonTestsWithoutBase58Addresses("ethereum");
		});
	});
});
