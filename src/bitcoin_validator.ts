import segwit from "./crypto/segwit_addr.ts";
import { sha256Checksum, toHex } from "./crypto/utils.ts";
import { Currency, CurrencyOpts } from "./types/currency.ts";
import { decodeBase58 } from "jsr:@std/encoding/base58";

const DEFAULT_NETWORK_TYPE = "prod";

function isSegwitAddressValid(
  address: string,
  currency: Currency,
  opts: CurrencyOpts = {},
) {
  if (!currency.bech32Hrp) {
    return false;
  }

  const { networkType = DEFAULT_NETWORK_TYPE } = opts;

  let correctBech32Hrps;
  if (
    currency.bech32Hrp && (networkType === "prod" || networkType === "testnet")
  ) {
    correctBech32Hrps = currency.bech32Hrp[networkType];
  } else if (currency.bech32Hrp) {
    correctBech32Hrps = currency.bech32Hrp.prod.concat(
      currency.bech32Hrp.testnet,
    );
  } else {
    return false;
  }

  for (const chrp of correctBech32Hrps) {
    const ret = segwit.decode(chrp, address);
    if (ret) {
      return segwit.encode(chrp, ret.version, ret.program) ===
        address.toLowerCase();
    }
  }

  return false;
}

function getDecoded(address: string) {
  try {
    return decodeBase58(address);
  } catch (e) {
    // if decoding fails, assume invalid address
    return null;
  }
}

function getAddressType(address: string, currency: Currency) {
  currency = currency || {};
  // should be 25 bytes per btc address spec and 26 decred
  const expectedLength = currency.expectedLength || 25;
  const decoded = getDecoded(address);

  if (decoded) {
    const length = decoded.length;

    if (length !== expectedLength) {
      return null;
    }

    if (currency.regex) {
      if (!currency.regex.test(address)) {
        return false;
      }
    }

    const checksum = toHex(decoded.slice(length - 4, length)),
      body = toHex(decoded.slice(0, length - 4)),
      goodChecksum = sha256Checksum(body);

    return checksum === goodChecksum
      ? toHex(decoded.slice(0, expectedLength - 24))
      : null;
  }

  return null;
}

function isValidP2PKHandP2SHAddress(
  address: string,
  currency: Currency,
  opts: CurrencyOpts,
) {
  const { networkType = DEFAULT_NETWORK_TYPE } = opts;

  let correctAddressTypes;
  const addressType = getAddressType(address, currency);

  if (currency.addressTypes && addressType) {
    if (networkType === "prod" || networkType === "testnet") {
      correctAddressTypes = currency.addressTypes[networkType];
    } else if (currency.addressTypes) {
      correctAddressTypes = currency.addressTypes.prod.concat(
        currency.addressTypes.testnet,
      );
    } else {
      return false;
    }

    return correctAddressTypes.indexOf(addressType) >= 0;
  }

  return false;
}

const isValidBitcoinAddress = (
  address: string,
  currency: Currency,
  opts: CurrencyOpts = {},
) => {
  return (
    isValidP2PKHandP2SHAddress(address, currency, opts) ||
    isSegwitAddressValid(address, currency, opts)
  );
};

export { isValidBitcoinAddress };
