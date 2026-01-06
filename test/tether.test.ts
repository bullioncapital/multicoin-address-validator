import { describe, it } from "vitest";
import { commonTests, invalid, valid } from "./helpers.ts";

describe("WAValidator - Tether (USDT)", () => {
	describe("valid results", () => {
		it("should return true for correct tether addresses", () => {
			valid("3MbYQMMmSkC3AgWkj9FMo5LsPTW1zBTwXL", "usdt");
			valid("1KdXaqcBeoMAFVAPwTmYvDbEq6RnvNPF6J", "tether");
			valid("0xF6f6ebAf5D78F4c93Baf856d3005B7395CCC272e", "usdt");
			valid("0x9ec7d40d627ec59981446a6e5acb33d51afcaf8a", "tether");
			valid("3MbYQMMmSkC3AgWkj9FMo5LsPTW1zBTwXL", "usdt", {
				chainType: "omni",
			});
			valid("0x9ec7d40d627ec59981446a6e5acb33d51afcaf8a", "tether", {
				chainType: "erc20",
			});
			valid("0x9ec7d40d627ec59981446a6e5acb33d51afcaf8a", "tether", {
				chainType: "ethereum",
			});
			valid("TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg3r", "tether", {
				chainType: "tron",
			});
			valid("TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg3r", "usdt", {
				chainType: "TRON",
				networkType: "prod",
			});
			valid("TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg3r", "tether", {
				chainType: "tron",
				networkType: "prod",
			});
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect tether addresses", () => {
			commonTests("usdt");
			invalid("1KdXaqcBeoMAFVAPwTmYvDbEq6RnvNPF6Jp", "tether");
			invalid("0xF6f6ebAf5D78F4c93Baf856d3005B7395CCC272eT", "usdt");
			invalid("3MbYQMMmSkC3AgWkj9FMo5LsPTW1zBTwXL", "usdt", {
				chainType: "erc20",
			});
			invalid("3MbYQMMmSkC3AgWkj9FMo5LsPTW1zBTwXL", "usdt", {
				chainType: "ethereum",
			});
			invalid("0x9ec7d40d627ec59981446a6e5acb33d51afcaf8a", "tether", {
				chainType: "omni",
			});
			invalid("TNDzfERDpxLDS2w1q6yaFC7pzqaSQ3Bg31", "tether", {
				chainType: "TRON",
			});
			invalid("27bLJCYjbH6MT8DBF9xcrK6yZnm43vx7MNQ", "tether", {
				chainType: "tron",
				networkType: "testnet",
			});
			invalid("0x9ec7d40d627ec59981446a6e5acb33d51afcaf8a", "usdt", {
				chainType: "TRON",
				networkType: "prod",
			});
		});
	});
});
