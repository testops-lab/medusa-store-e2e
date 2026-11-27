import { test, expect, type Page } from '@playwright/test';


test('메인 페이지 검증', async ({ page }) => {
  // When: 메두사 스토어에 접속한다
  await page.goto(process.env.STOREFRONT_PATH || '/');
  const main = page.getByRole('main');

  // Then: 본문 가운데에 소개 문구가 보인다 
  await expect(main.getByRole('heading', {
      name: '입는 순간 달라지는 자신감, 시선을 사로잡는 핏',
      exact: true,
      level: 1,
  })).toBeVisible();
  await expect(main.getByRole('heading', {
    name: 'MEDUSA STORE',
    exact: true,
    level: 2,
  })).toBeVisible();

  // Then: 네비게이션 바에 메뉴, 스토어명, 검색 아이콘, 장바구니가 보인다
  const navigation = main.getByRole('navigation');
  await expect(navigation.getByRole('button', { name: 'Menu', exact: true })).toBeVisible();
  await expect(navigation.getByRole('link', { name: '메두사 스토어', exact: true })).toBeVisible();
  await expect(navigation.getByRole('button', { name: '상품검색', exact: true }).locator('svg')).toBeVisible();
  await expect(navigation.getByRole('link', { name: '장바구니' })).toBeVisible();
});


test('메인 페이지 > Menu 버튼 검증', async ({ page }) => {
  // Given: 메인페이지에 접속한다
  await page.goto(process.env.STOREFRONT_PATH || '/');

  // When: Menu 버튼을 클릭한다
  const navigation = page.getByRole('navigation');
  await navigation.getByRole('button', { name: 'Menu', exact: true }).click();

  // Then: Home, Store, Account, Cart 링크가 보인다
  await expect(navigation.getByRole('link', { name: 'Home', exact: true })).toBeVisible();
  await expect(navigation.getByRole('link', { name: 'Store', exact: true })).toBeVisible();
  await expect(navigation.getByRole('link', { name: 'Account', exact: true })).toBeVisible();
  await expect(navigation.getByRole('link', { name: 'Cart', exact: true })).toBeVisible();
});


test('메인 페이지 > Menu > Home 버튼 검증', async ({ page }) => {
  // Given: 메인페이지에 접속하여 Menu 버튼을 클릭한다
  await page.goto(process.env.STOREFRONT_PATH || '/');
  const mainPageUrl = page.url();
  const navigation = page.getByRole('navigation');
  await navigation.getByRole('button', { name: 'Menu', exact: true }).click();

  // When: Home 버튼을 클릭한다
  await navigation.getByRole('link', { name: 'Home', exact: true }).click();

  // Then: 메인페이지로 돌아온다
  await expect(navigation.getByRole('link', { name: 'Home', exact: true })).toBeHidden();
  await expect(page).toHaveURL(mainPageUrl);
});


test('메인 페이지 > Menu > Store 버튼 검증', async ({ page }) => {
  // Given: 메인페이지에 접속하여 Menu 버튼을 클릭한다
  await page.goto(process.env.STOREFRONT_PATH || '/');
  const mainPageUrl = page.url();
  const navigation = page.getByRole('navigation');
  await navigation.getByRole('button', { name: 'Menu', exact: true }).click();

  // When: Store 버튼을 클릭한다
  await navigation.getByRole('link', { name: 'Store', exact: true }).click();

  // Then: 상품목록 페이지로 이동한다
  await expect(page).toHaveURL('/store');
});

test('메인 페이지 > Menu > Account 버튼 검증', async ({ page }) => {
  // Given: 메인페이지에 접속하여 Menu 버튼을 클릭한다
  await page.goto(process.env.STOREFRONT_PATH || '/');
  const mainPageUrl = page.url();
  const navigation = page.getByRole('navigation');
  await navigation.getByRole('button', { name: 'Menu', exact: true }).click();

  // When: Account 버튼을 클릭한다
  await navigation.getByRole('link', { name: 'Account', exact: true }).click();

  // Then: 계정 페이지로 이동한다
  await expect(page).toHaveURL('/account');
});


test('메인 페이지 > Menu > Cart 버튼 검증', async ({ page }) => {
  // Given: 메인페이지에 접속하여 Menu 버튼을 클릭한다
  await page.goto(process.env.STOREFRONT_PATH || '/');
  const mainPageUrl = page.url();
  const navigation = page.getByRole('navigation');
  await navigation.getByRole('button', { name: 'Menu', exact: true }).click();

  // When: Cart 버튼을 클릭한다
  await navigation.getByRole('link', { name: 'Cart', exact: true }).click();

  // Then: 장바구니 페이지로 이동한다
  await expect(page).toHaveURL('/cart');
});


test('메인 페이지 > 네비게이션 바 > `나의 계정` 링크 검증', async ({ page, isMobile }) => {
  test.skip(isMobile, '`나의 계정` 링크는 데스크톱에서만 표시됩니다.');

  // Given: 메인페이지에 접속한다
  await page.goto(process.env.STOREFRONT_PATH || '/');

  // When: 네비게이션 바의 '나의 계정'을 클릭한다
  const navigation = page.getByRole('navigation');
  await navigation.getByRole('link', { name: '나의 계정', exact: true }).click();

  // Then: 계정 페이지로 이동한다
  await expect(page).toHaveURL('/account');
});


test('메인 페이지 > 네비게이션 바 > `장바구니` 링크 검증', async ({ page, isMobile }) => {
  // Given: 메인페이지에 접속한다
  await page.goto(process.env.STOREFRONT_PATH || '/');

  // When: 네비게이션 바의 '장바구니'를 클릭한다
  const navigation = page.getByRole('navigation');
  await navigation.getByRole('link', { name: /^장바구니\s*\(\d+\)$/ }).click();

  // Then: 장바구니 페이지로 이동한다
  await expect(page).toHaveURL('/cart');
});
