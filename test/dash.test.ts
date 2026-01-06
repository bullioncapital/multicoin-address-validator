import { describe, it } from "vitest";
import { commonTests, invalid, valid } from "./helpers.ts";

describe("WAValidator - Dash (DASH)", () => {
	describe("valid results", () => {
		it("should return true for correct dash addresses", () => {
			valid("Xx4dYKgz3Zcv6kheaqog3fynaKWjbahb6b", "dash");
			valid("XcY4WJ6Z2Q8w7vcYER1JypC8s2oa3SQ1b1", "DASH");
			valid("XqMkVUZnqe3w4xvgdZRtZoe7gMitDudGs4", "dash");
			valid("yPv7h2i8v3dJjfSH4L3x91JSJszjdbsJJA", "dash", "testnet");
			valid("XoAAqv3oUYZ6xRjX3brfbf9PotrGanS6Th", "dash");
			valid("yP5oXZQXBfBf9FyfZDpFiKDypxuNUKUV2E", "dash", "testnet");
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect dash addresses", () => {
			commonTests("dash");

			// Invalid Dash addresses - wrong prefix
			invalid("DxMkVUZnqe3w4xvgdZRtZoe7gMitDudGs4", "dash");
			invalid("1xMkVUZnqe3w4xvgdZRtZoe7gMitDudGs4", "dash");

			// Invalid checksum
			invalid("Xx4dYKgz3Zcv6kheaqog3fynaKWjbahb6c", "dash");
			invalid("XcY4WJ6Z2Q8w7vcYER1JypC8s2oa3SQ1b2", "dash");

			// Wrong length
			invalid("Xx4dYKgz3Zcv6kheaqog3fynaKWjbahb", "dash");
			invalid("Xx4dYKgz3Zcv6kheaqog3fynaKWjbahb6b6b6b", "dash");

			// Testnet address on mainnet
			invalid("yPv7h2i8v3dJjfSH4L3x91JSJszjdbsJJA", "dash", "prod");

			// Other crypto addresses
			invalid("0xE37c0D48d68da5c5b14E5c1a9f1CFE802776D9FF", "dash");
			invalid("bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4", "dash");
		});
	});
});
