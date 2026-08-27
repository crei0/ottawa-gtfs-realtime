import { test, expect } from "@playwright/test";

test("Timeline > Take screenshots", async ({ page }) => {
	test.setTimeout(90 * 60 * 1000);

	await page.goto("http://localhost:5173/timeline");

    // HACK - Needed to wait for fade-in of map tiles
	await page.waitForTimeout(2000);

	const batchIndex: string = await page.locator("#metadata-batch-index").innerText();
	const batchCount: string = await page.locator("#metadata-batch-count").innerText();

	const nextButton = await page.getByTitle("button-next");

	for (let index = parseInt(batchIndex); index < parseInt(batchCount) - 1; index++) {
		await page.locator('#timeline').screenshot({ path: `e2e/screenshots/timeline-${index}.png` });

		console.info("Timeline > Take screenshots > Generated screenshot = ", index);
		
		nextButton.click();
	}

	// TODO: Find why it's crashing on `index = 547`, might be cause by a bug in the button `next` logic

	expect(true).toBe(true);
});