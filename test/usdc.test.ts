import { describe, it } from "vitest";
import { commonTestsWithoutBase58Addresses, invalid, valid } from "./helpers.ts";

describe("WAValidator - USD Coin (USDC)", () => {
	describe("valid results", () => {
		it("should return true for correct usdc addresses", () => {
			valid("0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB", "usdc");
			valid("0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb", "usdc");

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

			valid("0x27b1fdb04752bbc536007a920d24acb045561c26", "usdc", {
				chainType: "sonic",
			});
			valid("0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed", "usdc", {
				chainType: "sonic",
			});
			valid("0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359", "usdc", {
				chainType: "sonic",
			});
			valid("0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB", "USDC", {
				chainType: "sonic",
			});
			valid("0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb", "USDC", {
				chainType: "sonic",
			});

			valid("69UwBV4LPg7hHUS5JXiXyfgVnESmDKe8KJppsLj8pRU", "usdc", {
				chainType: "solana",
				networkType: "prod",
			});
		});

		it("should verify SPL addresses", () => {
			valid("69UwBV4LPg7hHUS5JXiXyfgVnESmDKe8KJppsLj8pRU", "usdc", {
				chainType: "solana",
				networkType: "prod",
			});
			invalid("0x9ec7d40d627ec59981446a6e5acb33d51afcaf8a", "usdc", {
				chainType: "solana",
				networkType: "prod",
			});
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect usdc addresses", () => {
			commonTestsWithoutBase58Addresses("usdc");
		});
	});
});
