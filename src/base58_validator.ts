import { Currency } from "./types/currency.ts";
import { decodeBase58 } from "jsr:@std/encoding/base58";

// simple base58 validator.  Just checks if it can be decoded.
const isValidAddress = (
  address: string,
  currency: Currency,
) => {
  try {
    if (!address || address.length == 0) {
      return false;
    }

    if (currency.minLength && (address.length < currency.minLength)) {
      return false;
    }

    if (currency.maxLength && (address.length > currency.maxLength)) {
      return false;
    }
    try {
      const decoded = decodeBase58(address);
      if (!decoded || !decoded.length) {
        return false;
      }
    } catch (e) {
      // if decoding fails, assume invalid address
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export { isValidAddress };
