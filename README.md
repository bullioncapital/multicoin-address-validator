# multicoin-address-validator

Simple wallet address validator for validating Bitcoin and other altcoins addresses in **Node.js and browser**.

Forked from [ryanralph/altcoin-address](https://github.com/ryanralph/altcoin-address).

**File size: ~16.85 kB (ESM, minified and gzipped)** | **~12.13 kB (CJS, minified and gzipped)**

## Installation

### NPM/PNPM/Yarn

```bash
npm install multicoin-address-validator
# or
pnpm add multicoin-address-validator
# or
yarn add multicoin-address-validator
```

### Browser

```html
<script src="wallet-address-validator.min.js"></script>
```

## API

## validate (address [, currency = 'bitcoin'[, networkType = 'prod']])

### Parameters

- **address** - Wallet address to validate.
- **currency** - Optional. Currency name or symbol, e.g. `'bitcoin'` (default), `'litecoin'` or `'LTC'`
- **networkType** - Optional. Use `'prod'` (default) to enforce standard address, `'testnet'` to enforce testnet address and `'both'` to enforce nothing.
- **chainType** - Optional. Specify the chainType, e.g. `'ethereum'`. If the given currency is not found but the chainType is, the validator for that chainType will be used, thus allowing unspecified tokens to be validated.

> Returns true if the address (string) is a valid wallet address for the crypto currency specified, see below for supported currencies.

### Supported Cryptocurrencies

This library supports 50+ cryptocurrencies. All addresses are validated using cryptographic methods (checksums, format validation, etc.).

#### Major Cryptocurrencies
- Bitcoin/BTC `'Bitcoin'` or `'btc'`
- Ethereum/ETH `'Ethereum'` or `'eth'`
- Cardano/ADA `'Cardano'` or `'ada'`
- Ripple/XRP `'Ripple'` or `'xrp'`
- Litecoin/LTC `'LiteCoin'` or `'ltc'`
- Bitcoin Cash/BCH `'BitcoinCash'` or `'bch'`
- Dogecoin/DOGE `'DogeCoin'` or `'doge'`
- Stellar/XLM `'Stellar'` or `'xlm'`
- Tron/TRX `'Tron'` or `'trx'`
- Algorand/ALGO `'Algorand'` or `'algo'`
- Hedera/HBAR `'Hedera'` or `'hbar'`
- Dash/DASH `'Dash'` or `'dash'`
- Cosmos/ATOM `'Cosmos'` or `'atom'`

#### Stablecoins
- Tether/USDT `'Tether'` or `'usdt'` (supports Omni, ERC-20, TRC-20)
- USD Coin/USDC `'USD Coin'` or `'usdc'` (supports Ethereum, Avalanche, Sonic, Solana)
- Multi-collateral DAI/DAI `'Multi-collateral DAI'` or `'dai'`

#### Layer 2 & Scaling Solutions
- Arbitrum/ARB `'Arbitrum'` or `'arb'`
- Avalanche/AVAX `'Avalanche'` or `'avax'`
- Polygon/POL `'Polygon'` or `'pol'`
- Sonic/S `'Sonic'` or `'s'`
- Fantom/FTM `'Fantom'` or `'ftm'`

#### DeFi Tokens (ERC-20)
- Aave Coin/AAVE `'Aave Coin'` or `'aave'`
- Uniswap/UNI `'Uniswap Coin'` or `'uni'`
- Chainlink/LINK `'Chainlink'` or `'link'`
- Maker/MKR `'Maker'` or `'mkr'`
- Yearn.finance/YFI `'Yearn.finance'` or `'yfi'`
- Lido DAO Token/LDO `'Lido DAO Token'` or `'ldo'`
- 0x/ZRX `'0x'` or `'zrx'`
- 1INCH/1INCH `'1INCH'` or `'1inch'`
- Basic Attention Token/BAT `'Basic Attention Token'` or `'bat'`
- Ankr/ANKR `'Ankr'` or `'ankr'`
- Gala/GALA `'Gala'` or `'gala'`

#### Other Tokens
- Immutable/IMX `'Immutable'` or `'imx'`
- Injective/INJ `'Injective'` or `'inj'`
- Fetch.ai/FET `'Fetch.ai'` or `'fet'`
- Mantra/OM `'Mantra'` or `'om'`
- Quant/QNT `'Quant'` or `'qnt'`
- Sei/SEI `'Sei'` or `'sei'`
- XDC Network/XDC `'XDC Network'` or `'xdc'`

#### Kinesis Tokens
- KVT/KVT `'KVT'` or `'kvt'`
- KAG/KAG `'KAG'` or `'kag'` (Gold-backed)
- KAU/KAU `'KAU'` or `'kau'` (Gold-backed)
- C1USD/C1USD `'C1USD'` or `'c1usd'`
- C1CAD/C1CAD `'C1CAD'` or `'c1cad'`
- C1GBP/C1GBP `'C1GBP'` or `'c1gbp'`
- C1AUD/C1AUD `'C1AUD'` or `'c1aud'`
- C1SGD/C1SGD `'C1SGD'` or `'c1sgd'`
- C1CHF/C1CHF `'C1CHF'` or `'c1chf'`
- C1AED/C1AED `'C1AED'` or `'c1aed'`

### Usage Examples

#### Node.js (CommonJS)

```javascript
const WAValidator = require("multicoin-address-validator");

const valid = WAValidator.validate("1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck", "BTC");
if (valid) {
  console.log("This is a valid address");
} else {
  console.log("Address INVALID");
}
// This will log 'This is a valid address' to the console.
```

#### Node.js (ES Modules)

```javascript
import WAValidator from "multicoin-address-validator";

const valid = WAValidator.validate("0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB", "ETH");
if (valid) {
  console.log("This is a valid address");
} else {
  console.log("Address INVALID");
}
// This will log 'This is a valid address' to the console.
```

#### Validating Unknown Tokens

For tokens not explicitly listed, you can use the `chainType` option:

```javascript
import WAValidator from "multicoin-address-validator";

const valid = WAValidator.validate(
  "0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB",
  "UNKNOWN_TOKEN",
  { chainType: "ethereum" }
);
if (valid) {
  console.log("This is a valid Ethereum address");
} else {
  console.log("Address INVALID");
}
// This will log 'This is a valid Ethereum address' to the console.
```

#### Testnet Addresses

```javascript
import WAValidator from "multicoin-address-validator";

const valid = WAValidator.validate(
  "mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef",
  "bitcoin",
  "testnet"
);
if (valid) {
  console.log("This is a valid testnet address");
} else {
  console.log("Address INVALID");
}
// This will log 'This is a valid testnet address' to the console.
```

#### Multi-chain Tokens

For tokens that exist on multiple chains (like USDT, USDC), you can specify the chain:

```javascript
import WAValidator from "multicoin-address-validator";

// Validate USDT on Ethereum
const ethValid = WAValidator.validate(
  "0xdac17f958d2ee523a2206206994597c13d831ec7",
  "usdt",
  { chainType: "ethereum" }
);

// Validate USDT on Tron
const tronValid = WAValidator.validate(
  "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  "usdt",
  { chainType: "tron" }
);

// Validate USDC on Solana
const solanaValid = WAValidator.validate(
  "69UwBV4LPg7hHUS5JXiXyfgVnESmDKe8KJppsLj8pRU",
  "usdc",
  { chainType: "solana" }
);
```

#### Finding Currency Information

```javascript
import WAValidator from "multicoin-address-validator";

const currency = WAValidator.findCurrency("xrp");
if (currency) {
  console.log("Currency name:", currency.name);
  console.log("Currency symbol:", currency.symbol);
} else {
  console.log("Currency not found");
}
```

## Validation Features

### Cryptographic Validation
All validators use proper cryptographic validation methods:
- **Checksum validation** - Detects typos and transcription errors
- **Format validation** - Ensures addresses match the expected format
- **Network validation** - Distinguishes between mainnet and testnet addresses

### Supported Address Formats

#### Bitcoin-based
- Legacy (P2PKH): Base58 with double SHA-256 checksum
- P2SH: Base58 wrapped SegWit addresses
- Native SegWit (Bech32): Modern address format with better error detection

#### Ethereum-based
- EIP-55 checksummed addresses (mixed case for error detection)
- All ERC-20 tokens use the same format

#### Specialized Formats
- **Cardano**: Byron (Base58+CBOR) and Shelley (Bech32) eras
- **Algorand**: Base32 with SHA-512/256 checksum, must end in [A,E,I,M,Q,U,Y,4]
- **Hedera**: Account ID (shard.realm.account), checksum format (HIP-15), and EVM addresses
- **Stellar**: Base32 with CRC-16 checksum
- **Ripple**: Custom Base58 alphabet
- **Tron**: Base58 with version byte 0x41

## Technical Details

### Dependencies
The library uses minimal, well-maintained dependencies:
- `@scure/base` - Unified base encoding (base58, base32, hex, bech32)
- `js-sha3` - Keccak-256 for Ethereum addresses
- `js-sha512` - SHA-512/256 for Algorand
- `jssha` - SHA-256 implementation
- `crc` - CRC checksums for Cardano and Stellar
- `cbor-js` - CBOR decoding for Cardano Byron addresses
- `bchaddrjs` - Bitcoin Cash address conversion

### Browser Compatibility
The library is fully compatible with modern browsers. All cryptographic operations use `Uint8Array` instead of Node.js `Buffer` for maximum compatibility.

### Bundle Size
- **ESM**: ~16.85 kB (gzipped: ~4.71 kB)
- **CommonJS**: ~12.13 kB (gzipped: ~4.23 kB)

## Development

### Setup
```bash
pnpm install
```

### Testing
```bash
pnpm test              # Run all tests
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Run tests with coverage
```

### Building
```bash
pnpm build            # Build ESM, CJS, and TypeScript declarations
```

### Linting
```bash
pnpm check            # Check and fix with Biome
pnpm lint             # Lint only
pnpm format           # Format code
```

## Contributing

Contributions are welcome! Please ensure:
1. All tests pass (`pnpm test`)
2. Code is properly formatted (`pnpm check`)
3. New validators include comprehensive test cases (both valid and invalid addresses)
4. Update documentation for new currencies

## License

MIT License - see LICENSE file for details

## Credits

Forked from [ryanralph/altcoin-address](https://github.com/ryanralph/altcoin-address)
