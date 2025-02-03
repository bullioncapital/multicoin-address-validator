import baseX from "base-x";
import { sha256Checksum, toHex } from "./crypto/utils.ts";

const ALLOWED_CHARS =
  "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz";

const codec = baseX(ALLOWED_CHARS);
const regexp = new RegExp("^r[" + ALLOWED_CHARS + "]{27,35}$");

const isValidXrpAddress = (address: string) => {
  if (regexp.test(address)) {
    return verifyXrpChecksum(address);
  }

  return false;
};

const verifyXrpChecksum = (address: string) => {
  const bytes = codec.decode(address);
  const computedChecksum = sha256Checksum(
    toHex(bytes.slice(0, -4)),
  );
  const checksum = toHex(bytes.slice(-4));

  return computedChecksum === checksum;
};

export default { isValidXrpAddress, verifyXrpChecksum };
