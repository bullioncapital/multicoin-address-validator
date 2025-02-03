import ETHValidator from "./ethereum_validator";
import { isValidAddress } from "./base58_validator.ts";
import { Currency, CurrencyOpts } from "./types/currency.ts";

const solanaValidator = (address: string, currency: Currency) =>
  isValidAddress(
    address,
    {
      ...currency,
      maxLength: 44,
      minLength: 43,
    },
  );

function checkAllValidators(
  address: string,
  currency: Currency,
  networkType: CurrencyOpts,
) {
  return (
    ETHValidator.isValidAddress(address, currency, networkType) ||
    solanaValidator(address, currency)
  );
}

export default {
  isValidAddress: function (
    address: string,
    currency: Currency,
    opts: CurrencyOpts,
  ) {
    if (opts) {
      switch (opts.chainType) {
        case "arbitrum":
        case "avalanche":
        case "erc20":
        case "ethereum":
          return ETHValidator.isValidAddress(
            address,
            currency,
            opts.networkType,
          );
        case "solana":
          return solanaValidator(address, currency);
      }
    }
    return checkAllValidators(address, currency, opts);
  },
};
