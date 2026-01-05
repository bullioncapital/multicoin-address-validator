# wallet-address-validator

Simple wallet address validator for validating Bitcoin and other altcoins
addresses in **Node.js and browser**.

[![Build Status](https://travis-ci.org/christsim/multicoin-address-validator.svg?branch=master)](https://travis-ci.org/christsim/multicoin-address-validator)

Forked from
[ryanralph/altcoin-address](https://github.com/ryanralph/altcoin-address).

**File size is ~17 kB (minifed and gzipped)**.

## Installation

### NPM

```
npm install multicoin-address-validator
```

### Browser

```html
<script src="wallet-address-validator.min.js"></script>
```

## API

##### validate (address [, currency = 'bitcoin'[, networkType = 'prod']])

###### Parameters

- address - Wallet address to validate.
- currency - Optional. Currency name or symbol, e.g. `'bitcoin'` (default),
  `'litecoin'` or `'LTC'`
- networkType - Optional. Use `'prod'` (default) to enforce standard address,
  `'testnet'` to enforce testnet address and `'both'` to enforce nothing.
- chainType - Optional. Specify the chainType, eg `'ethereum'`. If the given
  currency is not found but the chainType is, the validator for that chainType
  will be used, thus allowing unspecified tokens to be validated.

> Returns true if the address (string) is a valid wallet address for the crypto
> currency specified, see below for supported currencies.

### Supported crypto currencies

- 0x/zrx `'0x'` or `'zrx'`
- 1INCH/1inch `'1INCH'` or `'1inch'`
- Aave Coin/aave `'Aave Coin'` or `'aave'`
- Algorand/algo `'Algorand'` or `'algo'`
- Ankr/ankr `'Ankr'` or `'ankr'`
- Arbitrum/arb `'Arbitrum'` or `'arb'`
- Avalanche/avax `'Avalanche'` or `'avax'`
- Basic Attention Token/bat `'Basic Attention Token'` or `'bat'`
- Bitcoin/btc `'Bitcoin'` or `'btc'`
- BitcoinCash/bch `'BitcoinCash'` or `'bch'`
- C1AED/c1aed `'C1AED'` or `'c1aed'`
- C1AUD/c1aud `'C1AUD'` or `'c1aud'`
- C1CAD/c1cad `'C1CAD'` or `'c1cad'`
- C1CHF/c1chf `'C1CHF'` or `'c1chf'`
- C1GBP/c1gbp `'C1GBP'` or `'c1gbp'`
- C1SGD/c1sgd `'C1SGD'` or `'c1sgd'`
- C1USD/c1usd `'C1USD'` or `'c1usd'`
- Cardano/ada `'Cardano'` or `'ada'`
- Chainlink/link `'Chainlink'` or `'link'`
- Cosmos/atom `'Cosmos'` or `'atom'`
- Dash/dash `'Dash'` or `'dash'`
- DogeCoin/doge `'DogeCoin'` or `'doge'`
- Ethereum/eth `'Ethereum'` or `'eth'`
- Fantom/ftm `'Fantom'` or `'ftm'`
- Fetch.ai/fet `'Fetch.ai'` or `'fet'`
- Gala/gala `'Gala'` or `'gala'`
- Hedera/hbar `'Hedera'` or `'hbar'`
- Immutable/imx `'Immutable'` or `'imx'`
- Injective/inj `'Injective'` or `'inj'`
- KAG/kag `'KAG'` or `'kag'`
- KAU/kau `'KAU'` or `'kau'`
- KVT/kvt `'KVT'` or `'kvt'`
- Lido DAO Token/ldo `'Lido DAO Token'` or `'ldo'`
- LiteCoin/ltc `'LiteCoin'` or `'ltc'`
- Maker/mkr `'Maker'` or `'mkr'`
- Mantra/om `'Mantra'` or `'om'`
- Multi-collateral DAI/dai `'Multi-collateral DAI'` or `'dai'`
- Polygon/pol `'Polygon'` or `'pol'`
- Quant/qnt `'Quant'` or `'qnt'`
- Ripple/xrp `'Ripple'` or `'xrp'`
- Sei/sei `'Sei'` or `'sei'`
- Sonic/s `'Sonic'` or `'s'`
- Stellar/xlm `'Stellar'` or `'xlm'`
- Tether/usdt `'Tether'` or `'usdt'`
- Tron/trx `'Tron'` or `'trx'`
- Uniswap Coin/uni `'Uniswap Coin'` or `'uni'`
- USD Coin/usdc `'USD Coin'` or `'usdc'`
- USD1/usd1 `'USD1'` or `'usd1'`
- XDC Network/xdc `'XDC Network'` or `'xdc'`
- Yearn.finance/yfi `'Yearn.finance'` or `'yfi'`

### Usage example

#### Node

```javascript
var WAValidator = require("multicoin-address-validator");

var valid = WAValidator.validate("1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck", "BTC");
if (valid) {
  console.log("This is a valid address");
} else {
  console.log("Address INVALID");
}

// This will log 'This is a valid address' to the console.
```

```javascript
var WAValidator = require("multicoin-address-validator");

var valid = WAValidator.validate(
  "0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB",
  "UNKNOWN TOKEN",
  { chainType: "ethereum" },
);
if (valid) {
  console.log("This is a valid address");
} else {
  console.log("Address INVALID");
}

// This will log 'This is a valid address' to the console.
```

```javascript
var WAValidator = require("multicoin-address-validator");

var valid = WAValidator.validate(
  "1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck",
  "litecoin",
  "testnet",
);
if (valid) {
  console.log("This is a valid address");
} else {
  console.log("Address INVALID");
}

// As this is a invalid litecoin address 'Address INVALID' will be logged to console.
```

```javascript
var WAValidator = require("multicoin-address-validator");

var currency = WAValidator.findCurrency("xrp");
if (currency) {
  console.log("This currency exists");
} else {
  console.log("Currency INVALID");
}

// As this is a valid currency symbol 'This currency exists' will be logged to console.
```

```javascript
var WAValidator = require("multicoin-address-validator");

var currency = WAValidator.findCurrency("random");
if (currency) {
  console.log("This currency exists");
} else {
  console.log("Currency INVALID");
}

// As this is not a valid currency symbol 'Currency INVALID' will be logged to console.
```

#### Browser

```html
<script src="wallet-address-validator.min.js"></script>
```

```javascript
// WAValidator is exposed as a global (window.WAValidator)
var valid = WAValidator.validate(
  "1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck",
  "bitcoin",
);
if (valid) {
  alert("This is a valid address");
} else {
  alert("Address INVALID");
}

// This should show a pop up with text 'This is a valid address'.
```
