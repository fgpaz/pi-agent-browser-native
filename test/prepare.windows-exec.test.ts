import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("prepare.mjs never uses shell:true (Windows Program Files paths)", () => {
	const source = readFileSync(join(root, "scripts", "prepare.mjs"), "utf8");
	assert.equal(/shell\s*:\s*true/.test(source), false, "prepare must not pass shell:true to execFile");
	assert.match(source, /windowsHide:\s*true/);
	assert.match(source, /npm\.cmd/);
});
