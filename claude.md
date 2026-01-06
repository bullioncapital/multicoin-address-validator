# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-cryptocurrency wallet address validator library for Node.js and browser environments. It validates addresses for Bitcoin, Ethereum, and 50+ other cryptocurrencies using cryptographic validation methods.

**Tech Stack:**
- TypeScript 5.9+
- Vite 5.4+ (bundler)
- Vitest 1.6+ (testing)
- Biome 2.3+ (linting/formatting)
- pnpm (package manager)

## Development Commands

### Installation
```bash
pnpm install
```

### Build
```bash
pnpm build
```
Builds both ESM and CommonJS bundles using Vite and generates TypeScript declarations:
- `dist/wallet-address-validator.esm.js` (ESM, ~16.85 kB)
- `dist/wallet-address-validator.cjs.js` (CommonJS, ~12.13 kB)
- `dist/*.d.ts` (TypeScript declarations)

### Testing
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm vitest run test/bitcoin.test.ts
```

### Linting/Formatting
```bash
# Check and fix issues
pnpm check

# Lint only
pnpm lint

# Fix lint issues
pnpm lint:fix

# Format code
pnpm format
```

## Architecture Overview

### Main Entry Point
- `src/wallet_address_validator.ts` - Exports `validate()`, `getCurrencies()`, and `findCurrency()` functions
- `validate(address, currency, opts)` is the primary API that routes to appropriate validators

### Currency Configuration
- `src/currencies.ts` - Central registry of all supported currencies
- Each currency definition includes:
  - `name` and `symbol` for lookup
  - `validator` reference to validation logic
  - Optional: `addressTypes`, `bech32Hrp`, `regexp`, length constraints
  - Currencies are grouped by blockchain type (Bitcoin-based, Ethereum-based, etc.)

### Validator Pattern
All validators implement the same interface:
```typescript
{
  isValidAddress: (address: string, currency?: Currency | string, opts?: CurrencyOpts) => boolean;
  verifyChecksum: (address: string) => boolean;
}
```

### Validator Categories

**Bitcoin-based validators** (`bitcoin_validator.ts`):
- Used by: BTC, LTC, DOGE, DASH
- Validates both legacy (Base58) and SegWit (Bech32) addresses
- Uses `addressTypes` (hex prefixes) and `bech32Hrp` from currency config
- Checksum validation via double SHA-256

**Bitcoin Cash** (`bch_validator.ts`):
- Special handling for CashAddr format (starts with q/Q/p/P)
- Falls back to Base58 validation for legacy addresses

**Ethereum-based validators** (`ethereum_validator.ts`):
- Used by: ETH, AVAX, ARB, and all ERC-20 tokens
- Validates EIP-55 checksummed addresses (mixed case)
- Format: `0x` + 40 hex characters
- Checksum via Keccak-256

**Multi-chain tokens** (e.g., `usdt_validator.ts`, `usdc_validator.ts`, `kvt_validator.ts`):
- Route to different validators based on `chainType` option
- Example: USDT can be validated as Bitcoin (Omni), Ethereum (ERC-20), or Tron (TRC-20) address
- USDC supports Ethereum, Avalanche, Sonic, and Solana chains

**Specialized validators**:
- `ada_validator.ts` - Cardano (Byron: Base58+CBOR+CRC32, Shelley: Bech32)
- `algo_validator.ts` - Algorand (Base32 encoding with SHA-512/256 checksum)
- `stellar_validator.ts` - Stellar (Ed25519 public key, Base32 with CRC-16)
- `ripple_validator.ts` - Ripple/XRP (Base58 with custom alphabet)
- `hbar_validator.ts` - Hedera (account ID: shard.realm.account, checksum format, EVM addresses)
- `tron_validator.ts` - Tron (Base58 with double SHA-256 checksum)

### Cryptographic Utilities
Located in `src/crypto/`:
- `utils.ts` - SHA-256, Keccak-256 hashing functions (using `@scure/base` for hex encoding)
- `bech32.ts` - Bech32/Bech32m encoding/decoding (custom implementation for Cardano 110-char support)
- `segwit_addr.ts` - SegWit address validation

### Type Definitions
- `src/types/currency.ts` - Core types for `Currency`, `CurrencyOpts`, `AddressTypes`
- `src/types/encodings.ts` - Encoding-related types

## Key Dependencies

### Production Dependencies
- **@scure/base** (2.0.0) - Unified base encoding library (base58, base32, hex, bech32)
- **base-x** (4.0.1) - Base encoding for Stellar's custom alphabet
- **cbor-js** (0.1.0) - CBOR decoding for Cardano Byron addresses
- **crc** (4.3.2) - CRC checksums (Cardano, Stellar)
- **js-sha3** (0.8.0) - Keccak-256 for Ethereum
- **js-sha512** (0.9.0) - SHA-512/256 for Algorand
- **jssha** (3.3.1) - SHA-256 implementation

### Development Dependencies
- **@biomejs/biome** (2.3.11) - Fast linter and formatter
- **vite** (5.4.21) - Build tool
- **vitest** (1.6.1) - Testing framework
- **typescript** (5.9.3) - Type system
- **@types/node** (20.19.27) - Node.js types
- **rollup-plugin-visualizer** (6.0.5) - Bundle size analysis

## Testing Pattern

Tests use Vitest:
```typescript
import { describe, it } from "vitest";
import { valid, invalid, commonTests } from "./helpers.ts";

describe("WAValidator - Currency Name", () => {
  describe("valid results", () => {
    it("should return true for correct addresses", () => {
      valid("address", "currency");
      valid("address", "currency", "testnet");
      valid("address", "currency", { networkType: "both" });
    });
  });

  describe("invalid results", () => {
    it("should return false for incorrect addresses", () => {
      invalid("bad-address", "currency");
      commonTests("currency"); // Standard validation tests
    });
  });
});
```

### Test Helpers
- `valid(address, currency, opts?)` - Asserts address is valid
- `invalid(address, currency, opts?)` - Asserts address is invalid
- `commonTests(currency)` - Runs standard negative tests (empty, null, too short, etc.)
- `commonTestsWithoutBase58Addresses(currency)` - For Ethereum-only addresses

## Adding Support for New Currencies

1. Create a new validator in `src/` (e.g., `newcoin_validator.ts`)
2. Implement `isValidAddress()` and `verifyChecksum()` functions
3. Export as default object: `export default { isValidAddress, verifyChecksum }`
4. Add currency entry to `CURRENCIES` array in `src/currencies.ts`
5. Create test file in `test/` (e.g., `test/newcoin.test.ts`)
   - Include both positive (valid) and negative (invalid) test cases
6. Update README.md with the new currency in the supported list

## Important Notes

- The library builds to both ESM and CommonJS for maximum compatibility
- Use `@scure/base` for base encoding operations (base58, base32, hex)
- Network types: `"prod"` (mainnet), `"testnet"`, `"both"` (accepts either)
- Unknown tokens can be validated using `chainType` option (e.g., `{ chainType: "ethereum" }`)
- All validators handle case-insensitive currency name/symbol lookups
- Custom bech32 implementation is kept for Cardano (110-char limit vs @scure/base's 90-char limit)
- No Buffer usage - all crypto operations use Uint8Array for browser compatibility
- All tests must have comprehensive positive AND negative test cases
