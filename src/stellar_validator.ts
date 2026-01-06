import { hex } from "@scure/base";
import baseX from "base-x";
import crc from "crc";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

const base32 = baseX(ALPHABET);
const regexp = new RegExp(`^[${ALPHABET}]{56}$`);
const ed25519PublicKeyVersionByte = 6 << 3;

function swap16(number: number) {
	const lower = number & 0xff;
	const upper = (number >> 8) & 0xff;
	return (lower << 8) | upper;
}

const numberToHex = (number: number, length?: number): string => {
	let hexStr = number.toString(16);
	if (hexStr.length % 2 === 1) {
		hexStr = `0${hexStr}`;
	}
	return hexStr.padStart(length ?? hexStr.length, "0");
};

export default {
	isValidAddress: function (address: string) {
		if (regexp.test(address)) {
			return this.verifyChecksum(address);
		}

		return false;
	},

	verifyChecksum: (address: string) => {
		// based on https://github.com/stellar/js-stellar-base/blob/master/src/strkey.js#L126
		const bytes = base32.decode(address);
		if (bytes[0] !== ed25519PublicKeyVersionByte) {
			return false;
		}

		const bytesSlice = bytes.slice(0, -2);
		const computedChecksum = numberToHex(swap16(crc.crc16xmodem(bytesSlice.buffer)), 4);
		const checksum = hex.encode(bytes.slice(-2));

		return computedChecksum === checksum;
	},
};
