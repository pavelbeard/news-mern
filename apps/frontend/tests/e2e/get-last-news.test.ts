import { expect, test } from "@playwright/test";

test("should display the last news on the homepage", async ({ page }) => {
  await page.goto("http://localhost:5173");

  console.log("Page URL:", page.url());
  console.log("Page Inner HTML:", await page.innerHTML("body"));

  // Check if the last news is displayed
  const lastNews = page.locator(".text-3xl.font-bold");
  await expect(lastNews).toBeVisible();

  // Check if the title of the last news is correct
  const link = page.locator("a[data-slot='button']");
  await expect(link).toHaveText("Read article?");
});

test("should navigate to the news page when clicking on the last news link", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");

  // Click on the last news link
  const link = page.locator("a[data-slot='button']");
  await link.click();

  // Check if the URL is correct
  await expect(page).toHaveURL(/\/news\/id\/\d+/);

  // Check if the news title is displayed on the news page
  const newsTitle = page.locator("[data-slot='card-header']");
  await expect(newsTitle).toBeVisible();
});
