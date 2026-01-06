import { describe, it } from "vitest";
import { commonTests, invalid, valid } from "./helpers.ts";

describe("WAValidator - Bitcoin (BTC)", () => {
	describe("valid results", () => {
		it("should return true for correct bitcoin addresses", () => {
			valid("12KYrjTdVGjFMtaxERSk3gphreJ5US8aUP", "bitcoin");
			valid("12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y", "bitcoin");
			valid("12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y", "BTC");
			valid("12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y", "Bitcoin");
			valid("12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y", "btc");
			valid("12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y", "btc", "prod");
			valid("12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y", "btc", "both");
			valid("15uwigGExiNQxTNr1QSZYPXJMp9Px2YnVU", "btc", "prod");
			valid("3FyVFsEyyBPzHjD3qUEgX7Jsn4tcHNZFkn", "btc", "prod");
			valid("38mKdURe1zcQyrFqRLzR8PRao3iLGEPVsU", "btc", "prod");
			valid("mptPo5AvLzJXi4T82vR6g82fT5uJ6HsQCu", "btc", "both");
			valid("1oNLrsHnBcR6dpaBpwz3LSwutbUNkNSjs", "bitcoin");
			valid("mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef", "bitcoin", "testnet");
			valid("mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef", "bitcoin", "both");
			valid("1HVDCg2KrPBH1Mg5SK9fGjAR9KVqyMMdBC", "btc");

			valid("1oNLrsHnBcR6dpaBpwz3LSwutbUNkNSjs", "bitcoin", {
				chainType: "bitcoin",
			});
			valid("mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef", "bitcoin", {
				chainType: "bitcoin",
				networkType: "testnet",
			});
			valid("mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef", "bitcoin", {
				chainType: "bitcoin",
				networkType: "both",
			});
			valid("1HVDCg2KrPBH1Mg5SK9fGjAR9KVqyMMdBC", "btc", {
				chainType: "bitcoin",
			});

			valid("1SQHtwR5oJRKLfiWQ2APsAd9miUc4k2ez", "bitcoin");
			valid("116CGDLddrZhMrTwhCVJXtXQpxygTT1kHd", "bitcoin");

			// p2sh addresses
			valid("3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt", "bitcoin");
			valid("3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt", "bitcoin");
			valid("2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7", "bitcoin", "testnet");

			// regtest
			valid("GSa5espVLNseXEfKt46zEdS6jrPkmFghBU", "bitcoin", "testnet");

			// segwit addresses
			valid("BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4", "bitcoin");
			valid("bc1q2t63ewm3mvh0ztmnmezxm7s0tefknenxlrlwrk", "bitcoin");

			valid("tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7", "bitcoin", "testnet");
			valid("tb1qqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesrxh6hy", "bitcoin", "testnet");

			invalid("tc1qw508d6qejxtdg4y5r3zarvary0c5xw7kg3g4ty", "bitcoin");
			invalid(
				"bc1pw508d6qejxtdg4y5r3zarvary0c5xw7kw508d6qejxtdg4y5r3zarvary0c5xw7k7grplx",
				"bitcoin",
			);
			invalid("BC1SW50QA3JX3S", "bitcoin");
			invalid("bc1zw508d6qejxtdg4y5r3zarvaryvg6kdaj", "bitcoin");
			invalid("bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t5", "bitcoin");
			invalid("BC13W508D6QEJXTDG4Y5R3ZARVARY0C5XW7KN40WF2", "bitcoin");
			invalid("bc1rw5uspcuh", "bitcoin");
			invalid(
				"bc10w508d6qejxtdg4y5r3zarvary0c5xw7kw508d6qejxtdg4y5r3zarvary0c5xw7kw5rljs90",
				"bitcoin",
			);
			invalid("BC1QR508D6QEJXTDG4Y5R3ZARVARYV98GJ9P", "bitcoin");
			invalid("tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sL5k7", "bitcoin");
			invalid("bc1zw508d6qejxtdg4y5r3zarvaryvqyzf3du", "bitcoin");
			invalid("tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3pjxtptv", "bitcoin");
			invalid("bc1gmk9yu", "bitcoin");
		});
	});

	describe("invalid results", () => {
		it("should return false for incorrect bitcoin addresses", () => {
			commonTests("bitcoin");
		});
	});
});
