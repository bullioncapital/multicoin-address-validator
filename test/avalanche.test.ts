import { describe, it } from "vitest";
import { commonTests, invalid, valid } from "./helpers.ts";

describe("WAValidator - Avalanche (AVAX)", () => {
	describe("valid results", () => {
		it("should return true for correct avalanche addresses", () => {
			valid("0xE37c0D48d68da5c5b14E5c1a9f1CFE802776D9FF", "avax");
			valid("0xa00354276d2fC74ee91e37D085d35748613f4748", "avax");
			valid("0xAff4d6793F584a473348EbA058deb8caad77a288", "AVAX");
			valid("0xc6d9d2cd449a754c494264e1809c50e34d64562b", "AVAX");
			valid("0x52908400098527886E0F7030069857D2E4169EE7", "AVAX");
			valid("0x8617E340B3D01FA5F11F306F4090FD50E238070D", "AVAX");

			valid("0x27b1fdb04752bbc536007a920d24acb045561c26", "usdc", {
				chainType: "avalanche",
			});
			valid("0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed", "usdc", {
				chainType: "avalanche",
			});
			valid("0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359", "usdc", {
				chainType: "avalanche",
			});
			valid("0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB", "USDC", {
				chainType: "avalanche",
			});
			valid("0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb", "USDC", {
				chainType: "avalanche",
			});
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect avalanche addresses", () => {
			commonTests("avalanche");

			// solana address
			invalid("5ndLnEYqSFiA5yUFHo6LVZ1eWc6Rhh11K5CfJNkoHEPs", "usdc", {
				chainType: "avalanche",
			});
		});
	});
});
