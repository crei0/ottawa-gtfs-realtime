import { test, expect } from "@playwright/test";

test("Heatmap > Take screenshot", async ({ page }) => {
	test.setTimeout(30 * 60 * 1000);

	await page.goto("http://localhost:5173/heatmap");

    // HACK - Needed to wait for fade-in of map tiles
	await page.waitForTimeout(2000);

    await page.locator('#heatmap').screenshot({ path: `e2e/screenshots/heatmap.png` });

	expect(true).toBe(true);
});