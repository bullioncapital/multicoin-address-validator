import { sha512_256 } from "js-sha512";
import { byteArray2hexStr } from "./crypto/utils.ts";
import { encodeHex } from "jsr:@std/encoding/hex";
import { decodeBase32 } from "jsr:@std/encoding/base32";

const ALGORAND_CHECKSUM_BYTE_LENGTH = 4;
const ALGORAND_ADDRESS_LENGTH = 58;

const isValidAddress = (
  address: string,
) => {
  return verifyChecksum(address);
};

const verifyChecksum = (address: string) => {
  if (address.length !== ALGORAND_ADDRESS_LENGTH) {
    return false;
  } else {
    // Decode base32 Address
    const decoded = decodeBase32(address);
    const addr = decoded.slice(
      0,
      decoded.length - ALGORAND_CHECKSUM_BYTE_LENGTH,
    );
    const checksum = encodeHex(byteArray2hexStr(decoded.slice(-4)));

    // Hash Address - Checksum
    const code = sha512_256(byteArray2hexStr(addr))
      .substr(-ALGORAND_CHECKSUM_BYTE_LENGTH * 2);

    return code === checksum;
  }
};

export { isValidAddress, verifyChecksum };
