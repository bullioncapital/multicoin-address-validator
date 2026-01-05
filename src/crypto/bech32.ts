// Copyright (c) 2017, 2021 Pieter Wuille
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { CHARSET, encodings, GENERATOR } from "../constants/base32.ts";
import type { Encodings } from "../types/encodings.ts";

function getEncodingConst(enc: Encodings): number {
	if (enc === encodings.BECH32) {
		return 1;
	} else if (enc === encodings.BECH32M) {
		return 0x2bc830a3;
	} else {
		throw new Error("Invalid encoding argument");
	}
}

function polymod(values: number[]) {
	let chk = 1;
	for (let p = 0; p < values.length; ++p) {
		const top = chk >> 25;
		chk = ((chk & 0x1ffffff) << 5) ^ values[p];
		for (let i = 0; i < 5; ++i) {
			if ((top >> i) & 1) {
				chk ^= GENERATOR[i];
			}
		}
	}
	return chk;
}

function hrpExpand(hrp: string) {
	const ret = [];
	let p: number;
	for (p = 0; p < hrp.length; ++p) {
		ret.push(hrp.charCodeAt(p) >> 5);
	}
	ret.push(0);
	for (p = 0; p < hrp.length; ++p) {
		ret.push(hrp.charCodeAt(p) & 31);
	}
	return ret;
}

function verifyChecksum(
	hrp: string,
	data: Uint8Array | number[],
	enc: Encodings,
) {
	return polymod(hrpExpand(hrp).concat(data)) === getEncodingConst(enc);
}

function createChecksum(hrp: string, data: number[], enc: Encodings) {
	const values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
	const mod = polymod(values) ^ getEncodingConst(enc);
	const ret = [];
	for (let p = 0; p < 6; ++p) {
		ret.push((mod >> (5 * (5 - p))) & 31);
	}
	return ret;
}

function encode(hrp: string, data: number[], enc: Encodings) {
	const combined = data.concat(createChecksum(hrp, data, enc));
	let ret = `${hrp}1`;
	for (let p = 0; p < combined.length; ++p) {
		ret += CHARSET.charAt(combined[p]);
	}
	return ret;
}

function decode(bechString: string, enc: Encodings) {
	let p: number;
	let has_lower = false;
	let has_upper = false;
	for (p = 0; p < bechString.length; ++p) {
		if (bechString.charCodeAt(p) < 33 || bechString.charCodeAt(p) > 126) {
			return null;
		}
		if (bechString.charCodeAt(p) >= 97 && bechString.charCodeAt(p) <= 122) {
			has_lower = true;
		}
		if (bechString.charCodeAt(p) >= 65 && bechString.charCodeAt(p) <= 90) {
			has_upper = true;
		}
	}
	if (has_lower && has_upper) {
		return null;
	}
	bechString = bechString.toLowerCase();
	const pos = bechString.lastIndexOf("1");
	if (pos < 1 || pos + 7 > bechString.length || bechString.length > 110) {
		return null;
	}
	const hrp = bechString.substring(0, pos);
	const data = [];
	for (p = pos + 1; p < bechString.length; ++p) {
		const d = CHARSET.indexOf(bechString.charAt(p));
		if (d === -1) {
			return null;
		}
		data.push(d);
	}
	if (!verifyChecksum(hrp, data, enc)) {
		return null;
	}
	return { hrp: hrp, data: data.slice(0, data.length - 6) };
}

export default { decode, encode, encodings, verifyChecksum };
