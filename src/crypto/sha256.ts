import { createHash } from "node:crypto";
import { hex } from "@scure/base";

const sha256 = (payload: string) => {
	const hash = createHash("sha256");
	hash.update(hex.decode(payload));
	return hash.digest("hex");
};

const sha256Checksum: (payload: string) => string = (payload: string): string => {
	return sha256(sha256(payload)).substring(0, 8);
};

export { sha256, sha256Checksum };
