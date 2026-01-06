import { describe, it } from "vitest";
import { invalid, valid } from "./helpers.ts";

describe("WAValidator - Algorand (ALGO)", () => {
	describe("valid results", () => {
		it("should return true for correct algo addresses", () => {
			valid("GONISIUAYDOMHM7VURRAAAP5H6OAWRRBCPXEIOZO3QI7TZKR5GTAQ7WK7Y", "algo");
			valid("LCRDY3LYAANTVS3XRHEHWHGXRTKZYVTX55P5IA2AT5ZDJ4CWZFFZIKVHLI", "algo");
			valid("SP745JJR4KPRQEXJZHVIEN736LYTL2T2DFMG3OIIFJBV66K73PHNMDCZVM", "algo");
			valid("AKHSHWO2TUWE53RMVG6ZUBNAEX6MTYPT76TCIDCDWYUUTK6HCJTZS2HDQU", "algo");
			// Must end in one of: A, E, I, M, Q, U, Y, 4
			valid("6BJ32SU3ABLWSBND7U5H2QICQ6GGXVD7AXSSMRYM2GO3RRNHCZIUT4ISAQ", "algo");
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect algo addresses", () => {
			// Wrong length (not 58 chars)
			invalid("GONISIUAYDOMHM7VURRAAAP5H6OAWRRBCPXEIOZO3QI7TZKR5GTAQ7WK", "algo");
			invalid("GONISIUAYDOMHM7VURRAAAP5H6OAWRRBCPXEIOZO3QI7TZKR5GTAQ7WK7YAA", "algo");

			// Invalid characters (contains 0, 1, 8, 9 or lowercase)
			invalid("GON1S1UAYDOMHM7VURRAAAP5H6OAWRRBCPXEIOZO3QI7TZKR5GTAQ7WK7Y", "algo");
			invalid("gon1s1uaydomhm7vurraaap5h6oawrrbcpxeiozo3qi7tzkr5gtaq7wk7y", "algo");
			invalid("GONISIUAYDOMHM7VURRAAAP5H6OAWRRBCPX8I0Z03QI7TZKR5GTAQ7WK7Y", "algo");

			// Invalid ending character (must end in A, E, I, M, Q, U, Y, or 4)
			invalid("GONISIUAYDOMHM7VURRAAAP5H6OAWRRBCPXEIOZO3QI7TZKR5GTAQ7WK7Z", "algo");
			invalid("GONISIUAYDOMHM7VURRAAAP5H6OAWRRBCPXEIOZO3QI7TZKR5GTAQ7WK7B", "algo");

			// Invalid checksum
			invalid("GONISIUAYDOMHM7VURRAAAP5H6OAWRRBCPXEIOZO3QI7TZKR5GTAQ7WK7A", "algo");

			// Empty and other currencies
			invalid("", "algo");
			invalid("0xE37c0D48d68da5c5b14E5c1a9f1CFE802776D9FF", "algo");
			invalid("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", "algo");
		});
	});
});
