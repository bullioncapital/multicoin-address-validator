import {
  findCurrency,
  getCurrencies,
} from "../src/wallet_address_validator.ts";
import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";

describe("WAValidator.getCurrencies()", () => {
  it("Should get all currencies", function () {
    const currencies = getCurrencies();
    expect(currencies).toReturn();
    expect(currencies.length).toBeGreaterThan(0);
  });

  it("Should find a specific currency by symbol", function () {
    const currency = findCurrency("xrp");

    if (!currency) {
      throw new Error("Failed to get currency");
    }
    expect(currency.name).toEqual("Ripple");
    expect(currency.symbol).toEqual("xrp");
  });

  it("Should find a specific currency by name", function () {
    const currency = findCurrency("Ripple");

    if (!currency) {
      throw new Error("Failed to get currency");
    }
    expect(currency.name).toEqual("Ripple");
    expect(currency.symbol).toEqual("xrp");
  });

  it("Should return null if currency is not found", function () {
    const currency = findCurrency("random");
    expect(currency).toBe(null);
  });
});
