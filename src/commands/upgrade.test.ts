/**
 * Tests for the ov upgrade command.
 *
 * Structural tests for CLI registration and option parsing.
 * Network calls and subprocess execution happen via real implementations;
 * this file tests command structure and output format rather than side effects.
 */

import { describe, expect, test } from "bun:test";
import { createUpgradeCommand, fetchLatestVersion, getCurrentVersion } from "./upgrade.ts";

describe("createUpgradeCommand — CLI structure", () => {
	test("command has correct name", () => {
		const cmd = createUpgradeCommand();
		expect(cmd.name()).toBe("upgrade");
	});

	test("description mentions overstory", () => {
		const cmd = createUpgradeCommand();
		expect(cmd.description().toLowerCase()).toContain("overstory");
	});

	test("has --check option", () => {
		const cmd = createUpgradeCommand();
		const optionNames = cmd.options.map((o) => o.long);
		expect(optionNames).toContain("--check");
	});

	test("has --json option", () => {
		const cmd = createUpgradeCommand();
		const optionNames = cmd.options.map((o) => o.long);
		expect(optionNames).toContain("--json");
	});

	test("has --all option", () => {
		const cmd = createUpgradeCommand();
		const optionNames = cmd.options.map((o) => o.long);
		expect(optionNames).toContain("--all");
	});

	test("returns a Command instance", () => {
		const cmd = createUpgradeCommand();
		// Commander Command instances have a .parse method
		expect(typeof cmd.parse).toBe("function");
	});
});

describe("getCurrentVersion", () => {
	test("returns a semver string", async () => {
		const version = await getCurrentVersion();
		// Semver format: major.minor.patch (possibly with pre-release suffix)
		expect(version).toMatch(/^\d+\.\d+\.\d+/);
	});
});

describe("fetchLatestVersion", () => {
	test("rejects for a nonexistent package", async () => {
		await expect(
			fetchLatestVersion("nonexistent-package-xyz-12345-no-such-thing"),
		).rejects.toThrow();
	});
});
