import { describe, it } from "vitest";
import { invalid, valid } from "./helpers.ts";

describe("WAValidator - Ripple (XRP)", () => {
	describe("valid results", () => {
		it("should return true for correct Ripple addresses", () => {
			valid("rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn", "ripple");
			valid("rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn", "XRP");
			valid("r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV", "XRP");
			valid("rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", "XRP");
			valid("rDTXLQ7ZKZVKz33zJbHjgVShjsBnqMBhmN", "XRP");
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect ripple addresses", () => {
			invalid("rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCN", "ripple");
			invalid("rDTXLQ7ZKZVKz33zJbHjgVShjsBnqMBhMN", "XRP");
			invalid("6xAff4d6793F584a473348EbA058deb8ca", "ripple");
			invalid("DJ53hTyLBdZp2wMi5BsCS3rtEL1ioYUkva", "ripple");
		});
	});
});
