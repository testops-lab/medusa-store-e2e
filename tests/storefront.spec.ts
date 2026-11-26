import { test, expect } from '@playwright/test';

test('스토어 첫 페이지가 정상적으로 열린다', async ({ page }) => {
  const response = await page.goto(process.env.STOREFRONT_PATH || '/');

  expect(response, '스토어 문서 응답이 있어야 합니다').not.toBeNull();
  expect(response!.ok(), '스토어가 성공 응답을 반환해야 합니다').toBeTruthy();
  await expect(page).toHaveTitle(/\S/);
  await expect(page.locator('body')).toBeVisible();
});
