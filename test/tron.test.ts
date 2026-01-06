import { describe, it } from "vitest";
import { commonTests, invalid, valid } from "./helpers.ts";

describe("WAValidator - Tron (TRX)", () => {
	describe("valid results", () => {
		it("should return true for correct trx addresses", () => {
			valid("TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg3r", "trx");
			valid("TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg3r", "trx", "testnet");
		});

		it("should return true for correct trc20 addresses for unknown tokens, when chainType is provided", () => {
			valid("TFEkshkSXo8yMe8vcA6P77XmiLfstNWHyT", "unknown trc20", {
				chainType: "tron",
				networkType: "prod",
			});
			valid("TUBBzKNM9gr687ucwj8fvVS2Sf2e4WseVa", "unknown trc20", {
				chainType: "tron",
				networkType: "testnet",
			});
			valid("TFEkshkSXo8yMe8vcA6P77XmiLfstNWHyT", "unknown trc20", {
				chainType: "tron",
			});
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect tron addresses", () => {
			commonTests("trx");
			invalid("xrb_1111111112111111111111111111111111111111111111111111hifc8npp", "trx");
			invalid("TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg31", "trx");
			invalid("27bLJCYjbH6MT8DBF9xcrK6yZnm43vx7MNQ", "trx");
		});

		it("should return false for incorrect trc20 addresses for unknown tokens, even if chainType is provided", () => {
			invalid("TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg31", "unknown trc20", {
				chainType: "TRON",
			});
			invalid("27bLJCYjbH6MT8DBF9xcrK6yZnm43vx7MNQ", "unknown trc20", {
				chainType: "tron",
				networkType: "testnet",
			});
			invalid("27bLJCYjbH6MT8DBF9xcrK6yZnm43vx7MNQ", "unknown trc20", {
				chainType: "tron",
				networkType: "prod",
			});
		});
	});
});
