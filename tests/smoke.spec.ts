import { expect, test } from "@playwright/test";

const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB/SURBVFhH7c67DcAgEARRynE5LseduhysC0hGfO4QMkLa4CWW2Zv03FfeKfHD3xSgAAWcGZDf1MR/R0IBPNbDty3uAB7w4EbNGQEcjuAWKWAYwMEo7tEwwHA0glukAFeA4bAHN2rOCTA80MO3LaGAgsdmDhdTASspQAEK2B7wAePJasVCLN23AAAAAElFTkSuQmCC",
  "base64",
);

test("首页展示品牌、入口和核心内容", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("把校园里的光");
  await expect(page.getByRole("link", { name: /开始优化照片/ })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /校园里的光/ })).toBeVisible();
  await expect(page.locator("main img").first()).toHaveAttribute("alt", /晨光|摄影/);
});

test("导航可进入所有核心页面", async ({ page }) => {
  await page.goto("/");
  const menu = page.getByRole("button", { name: /打开导航菜单/ });
  const nav = page.getByRole("navigation", { name: "主导航" });
  if (await menu.isVisible()) await menu.click();
  await nav.getByRole("link", { name: "AI 修图", exact: true }).click();
  await expect(page).toHaveURL(/\/studio\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("让原片回到");
  await page.goto("/community");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("校园作品社区");
  await page.goto("/spots");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("校园取景灵感");
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("关于光厘");
});

test("用户可上传原片并完成前后对比和下载", async ({ page }) => {
  await page.route("https://api.openai.com/v1/images/edits", (route) => {
    if (route.request().method() === "OPTIONS") {
      return route.fulfill({ status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": "POST, OPTIONS" } });
    }
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ data: [{ b64_json: png.toString("base64") }] }),
    });
  });
  await page.goto("/studio");
  await expect(page.locator("#photo-upload")).toHaveAttribute("data-ready", "true");
  await page.locator("#photo-upload").setInputFiles({ name: "campus.png", mimeType: "image/png", buffer: png });
  await expect(page.getByAltText("待优化的原始照片")).toBeVisible({ timeout: 10_000 });
  await page.getByRole("button", { name: /一键优化照片/ }).click();
  await expect(page.locator(".alert--success")).toBeVisible();
  await expect(page.getByTestId("comparison")).toBeVisible();
  await expect(page.getByRole("link", { name: /下载优化成片/ })).toHaveAttribute("download", "guangli-enhanced.webp");
});

test("非法格式给出明确提示", async ({ page }) => {
  await page.goto("/studio");
  await expect(page.locator("#photo-upload")).toHaveAttribute("data-ready", "true");
  await page.locator("#photo-upload").setInputFiles({ name: "notes.txt", mimeType: "text/plain", buffer: Buffer.from("no photo") });
  await expect(page.locator('.alert[role="alert"]')).toContainText("仅支持 JPEG、PNG 和 WebP");
});

test("响应式页面没有横向溢出", async ({ page }) => {
  for (const path of ["/", "/studio", "/community", "/spots", "/about"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `${path} horizontal overflow`).toBeLessThanOrEqual(1);
  }
});

test("移动导航可打开并完成跳转", async ({ page, isMobile }) => {
  test.skip(!isMobile, "仅在移动项目运行");
  await page.goto("/");
  await page.getByRole("button", { name: "打开导航菜单" }).click();
  await expect(page.getByRole("navigation", { name: "主导航" })).toBeVisible();
  await page.getByRole("navigation", { name: "主导航" }).getByRole("link", { name: "校园取景", exact: true }).click();
  await expect(page).toHaveURL(/\/spots\/?$/);
});