import { crypto } from "jsr:@std/crypto";
import { decodeHex, encodeHex } from "jsr:@std/encoding/hex";

const numberToHex = (number: number, length?: number) => {
  let hex = number.toString(16);
  if (hex.length % 2 === 1) {
    hex = "0" + hex;
  }
  return hex.padStart(length ?? hex.length, "0");
};

const byte2hexStr = (byte: number) => {
  const hexByteMap = "0123456789ABCDEF";
  let str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
};

const byteArray2hexStr = (byteArray: Uint8Array) => {
  let str = "";
  let i = 0;
  for (i; i < (byteArray.length - 1); i++) {
    str += byte2hexStr(byteArray[i]);
  }
  str += byte2hexStr(byteArray[i]);
  return str;
};

const toHex = (arrayOfBytes: Uint8Array) => {
  return encodeHex(arrayOfBytes);
};

const sha256 = async (payload: string) => {
  const sha = await crypto.subtle.digest("SHA-256", decodeHex(payload));
  return encodeHex(sha);
};

const sha256Checksum = async (payload: string) => {
  return (await sha256(await sha256(payload))).substring(0, 8);
};

export {
  byte2hexStr,
  byteArray2hexStr,
  numberToHex,
  sha256,
  sha256Checksum,
  toHex,
};
