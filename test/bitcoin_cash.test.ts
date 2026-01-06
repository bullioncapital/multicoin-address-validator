import { describe, it } from "vitest";
import { commonTests, invalid, valid } from "./helpers.ts";

describe("WAValidator - Bitcoin Cash (BCH)", () => {
	describe("valid results", () => {
		it("should return true for correct bitcoincash addresses", () => {
			valid("12KYrjTdVGjFMtaxERSk3gphreJ5US8aUP", "bitcoincash");
			valid("12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y", "bitcoincash");
			valid("12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y", "BCH");
			valid("12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y", "Bitcoin");
			valid("12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y", "bch");
			valid("12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y", "bch", "prod");
			valid("12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y", "bch", "both");
			valid("1oNLrsHnBcR6dpaBpwz3LSwutbUNkNSjs", "bitcoincash");
			valid("mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef", "bitcoincash", "testnet");
			valid("mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef", "bitcoincash", "both");

			// p2sh addresses
			valid("3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt", "bitcoincash");
			valid("2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7", "bitcoincash", "testnet");

			valid("bitcoincash:qq4v32mtagxac29my6gwj6fd4tmqg8rysu23dax807", "bch");
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect bitcoincash addresses", () => {
			commonTests("bitcoincash");

			// bch addresses
			invalid("bc1ql08eyrk03qytqc5pdp5fnwpfh0x3y3k2skauvd", "bitcoincash", "both");
		});
	});
});
