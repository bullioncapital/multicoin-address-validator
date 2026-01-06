export interface AddressDetails {
	prod: string[];
	testnet: string[];
}

export type AddressTypes = "prod" | "testnet" | "both";

export interface CurrencyOpts {
	networkType?: AddressTypes;
	chainType?: string;
}

export interface Currency {
	name: string;
	symbol: string;
	addressTypes?: AddressDetails;
	regex?: RegExp;
	regexp?: string;
	expectedLength?: number;
	hashFunction?: string;
	iAddressTypes?: AddressDetails;
	bech32Hrp?: AddressDetails;
	minLength?: number;
	maxLength?: number;
	validator: {
		isValidAddress: (address: string, currency?: Currency | string, opts?: CurrencyOpts) => boolean;
		verifyChecksum: (address: string) => boolean;
	};
}
