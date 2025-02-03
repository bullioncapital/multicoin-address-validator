import type { encodings } from "../constants/base32.ts";

export type EncodingMap = typeof encodings;
export type Encodings = EncodingMap[keyof EncodingMap];
