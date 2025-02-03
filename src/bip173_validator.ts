import { Currency, CurrencyOpts } from "./types/currency.ts";
import bech32 from "./crypto/bech32.ts";

// bip 173 bech 32 addresses (https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki)
const isValidAddress = (
  address: string,
  currency: Currency,
  opts: CurrencyOpts = {},
) => {
  const { networkType = "prod" } = opts;
  const decoded = bech32.decode(address, bech32.encodings.BECH32);
  if (!decoded) {
    return false;
  }

  const bech32Hrp = decoded.hrp;
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

  if (correctBech32Hrps.indexOf(bech32Hrp) === -1) {
    return false;
  }

  return true;
};

export { isValidAddress };
