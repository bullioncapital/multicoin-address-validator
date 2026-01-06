import ADAValidator from "./ada_validator.ts";
import AlgoValidator from "./algo_validator.ts";
import BCHValidator from "./bch_validator.ts";
import BTCValidator from "./bitcoin_validator.ts";
import ETHValidator from "./ethereum_validator.ts";
import HbarValidator from "./hbar_validator.ts";
import KVTValidator from "./kvt_validator.ts";
import XRPValidator from "./ripple_validator.ts";
import XLMValidator from "./stellar_validator.ts";
import TronValidator from "./tron_validator.ts";
import type { Currency } from "./types/currency.ts";
import USDCValidator from "./usdc_validator.ts";
import USDTValidator from "./usdt_validator.ts";

// Currencies from currencies.json (excluding fiat: USD, EUR, GBP, CAD, AUD, CHF, SGD, AED, KES)
const CURRENCIES: Currency[] = [
	// Bitcoin-based
	{
		name: "Bitcoin",
		symbol: "btc",
		addressTypes: { prod: ["00", "05"], testnet: ["6f", "c4", "3c", "26"] },
		bech32Hrp: { prod: ["bc"], testnet: ["tb"] },
		validator: BTCValidator,
	},
	{
		name: "BitcoinCash",
		symbol: "bch",
		regexp: "^[qQpP]{1}[0-9a-zA-Z]{41}$",
		addressTypes: { prod: ["00", "05"], testnet: ["6f", "c4"] },
		validator: BCHValidator,
	},
	{
		name: "LiteCoin",
		symbol: "ltc",
		addressTypes: { prod: ["30", "05", "32"], testnet: ["6f", "c4", "3a"] },
		bech32Hrp: { prod: ["ltc"], testnet: ["tltc"] },
		validator: BTCValidator,
	},
	{
		name: "DogeCoin",
		symbol: "doge",
		addressTypes: { prod: ["1e", "16"], testnet: ["71", "c4"] },
		validator: BTCValidator,
	},
	{
		name: "Dash",
		symbol: "dash",
		addressTypes: { prod: ["4c", "10"], testnet: ["8c", "13"] },
		validator: BTCValidator,
	},
	// Ethereum-based
	{
		name: "Ethereum",
		symbol: "eth",
		validator: ETHValidator,
	},
	{
		name: "Avalanche",
		symbol: "avax",
		validator: ETHValidator,
	},
	{
		name: "Arbitrum",
		symbol: "arb",
		validator: ETHValidator,
	},
	{
		name: "Uniswap Coin",
		symbol: "uni",
		validator: ETHValidator,
	},
	{
		name: "Chainlink",
		symbol: "link",
		validator: ETHValidator,
	},
	{
		name: "Aave Coin",
		symbol: "aave",
		validator: ETHValidator,
	},
	{
		name: "Yearn.finance",
		symbol: "yfi",
		validator: ETHValidator,
	},
	{
		name: "Lido DAO Token",
		symbol: "ldo",
		validator: ETHValidator,
	},
	{
		name: "Basic Attention Token",
		symbol: "bat",
		validator: ETHValidator,
	},
	{
		name: "0x",
		symbol: "zrx",
		validator: ETHValidator,
	},
	{
		name: "Maker",
		symbol: "mkr",
		validator: ETHValidator,
	},
	{
		name: "Multi-collateral DAI",
		symbol: "dai",
		validator: ETHValidator,
	},
	{
		name: "Quant",
		symbol: "qnt",
		validator: ETHValidator,
	},
	{
		name: "Gala",
		symbol: "gala",
		validator: ETHValidator,
	},
	{
		name: "Fetch.ai",
		symbol: "fet",
		validator: ETHValidator,
	},
	{
		name: "Ankr",
		symbol: "ankr",
		validator: ETHValidator,
	},
	{
		name: "1INCH",
		symbol: "1inch",
		validator: ETHValidator,
	},
	{
		name: "Polygon",
		symbol: "pol",
		validator: ETHValidator,
	},
	{
		name: "Mantra",
		symbol: "om",
		validator: ETHValidator,
	},
	{
		name: "Immutable",
		symbol: "imx",
		validator: ETHValidator,
	},
	{
		name: "Fantom",
		symbol: "ftm",
		validator: ETHValidator,
	},
	{
		name: "Cosmos",
		symbol: "atom",
		validator: ETHValidator,
	},
	{
		name: "Injective",
		symbol: "inj",
		validator: ETHValidator,
	},
	{
		name: "Sei",
		symbol: "sei",
		validator: ETHValidator,
	},
	{
		name: "Sonic",
		symbol: "s",
		validator: ETHValidator,
	},
	{
		name: "XDC Network",
		symbol: "xdc",
		validator: ETHValidator,
	},
	{
		name: "USD1",
		symbol: "usd1",
		validator: ETHValidator,
	},
	{
		name: "Tron",
		symbol: "trx",
		validator: TronValidator,
	},
	// Other blockchains
	{
		name: "Ripple",
		symbol: "xrp",
		validator: XRPValidator,
	},
	{
		name: "Cardano",
		symbol: "ada",
		bech32Hrp: { prod: ["addr"], testnet: ["addr"] },
		validator: ADAValidator,
	},
	{
		name: "Algorand",
		symbol: "algo",
		validator: AlgoValidator,
	},
	{
		name: "Hedera",
		symbol: "hbar",
		validator: HbarValidator,
	},
	// Stellar and Stellar-based tokens
	{
		name: "Stellar",
		symbol: "xlm",
		validator: XLMValidator,
	},
	{
		name: "KAU",
		symbol: "kau",
		validator: XLMValidator,
	},
	{
		name: "KAG",
		symbol: "kag",
		validator: XLMValidator,
	},
	{
		name: "C1USD",
		symbol: "c1usd",
		validator: XLMValidator,
	},
	{
		name: "C1GBP",
		symbol: "c1gbp",
		validator: XLMValidator,
	},
	{
		name: "C1AUD",
		symbol: "c1aud",
		validator: XLMValidator,
	},
	{
		name: "C1CAD",
		symbol: "c1cad",
		validator: XLMValidator,
	},
	{
		name: "C1CHF",
		symbol: "c1chf",
		validator: XLMValidator,
	},
	{
		name: "C1AED",
		symbol: "c1aed",
		validator: XLMValidator,
	},
	{
		name: "C1SGD",
		symbol: "c1sgd",
		validator: XLMValidator,
	},
	// Multi-chain tokens
	{
		name: "KVT",
		symbol: "kvt",
		validator: KVTValidator,
	},
	{
		name: "Tether",
		symbol: "usdt",
		addressTypes: { prod: ["00", "05", "65"], testnet: ["6f", "c4", "65"] },
		validator: USDTValidator,
	},
	{
		name: "USD Coin",
		symbol: "usdc",
		validator: USDCValidator,
	},
];

const getByNameOrSymbol = (currencyNameOrSymbol: string) => {
	const nameOrSymbol = currencyNameOrSymbol.toLowerCase();
	return CURRENCIES.find(
		(currency) =>
			currency.name.toLowerCase() === nameOrSymbol ||
			currency.symbol.toLowerCase() === nameOrSymbol,
	);
};

const getAll = () => {
	return CURRENCIES;
};

export { getAll, getByNameOrSymbol };
