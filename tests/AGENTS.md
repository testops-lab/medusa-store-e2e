### playwright 테스트 작성 시 유의사항
1. 모든 테스트는 기본적으로 Given, When, Then 으로 구성한다. 단, 초기 depth 를 검증하는 기본 테스트에서는 Given 이 생략 될 수 있다.
2. 사용자가 프롬프트로 Given, When, Then 구문을 제공하면 해당 내용들은 테스트 내부에서 주석으로 작성하고 주석 아래에 각 구문을 수행하는 코드를 작성한다. (아래 예시 참고)
``` 
메인페이지를 검증하는 테스트 작성해줘. When-Then 구문은 아래와 같아.

When: 메두사 스토어에 접속한다
Then:
  본문 가운데에 소개 문구가 보인다 
  네비게이션 바에 메뉴, 스토어명, 검색 아이콘, 장바구니가 보인다
```

```typescript
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
```

3. 테스트 복잡도가 높아질수록 들여쓰기에 의한 가독성이 저해될 수 있기 때문에 불필요한 `test.step` 은 사용하지 않는다.
4. 프롬프트에 UI 컴포넌트과 관련하여 모호한 표현이 있다면 로컬 PC에 실행중인 스토어프론트에 직접 접속하여 사용자가 어떤 컴포넌트를 검증하고자 하는지 찾아본다. 만약 스토어프론트 프로세스가 실행중이지 않다면 로컬에 스토어프론트 프로세스가 떠 있지 않음을 사용자에게 알려주고 모호한 표현에 대한 구체적인 설명을 요청한다.

### 리팩터링 지침
1. 반복되는 코드를 3줄 이상 발견하면 코드 재사용성을 높이기 위해 함수로 리팩터링한다. 이 때 바로 파일에 바로 반영하지 않고 리팩터링에 의해 변경되는 파일들의 As-Is/To-Be 를 구분하여 보여주고 리팩터링을 진행할 지 되묻는다. 
2. 사용자가 리팩터링을 요청할 때에도 마찬가지로 파일에 바로 반영하지 않고 리팩터링에 의해 변경되는 파일들의 As-Is/To-Be 를 구분하여 보여주고 리팩터링을 진행할 지 되묻는다.
3. 함수를 구현할 때에는 `tests/<도메인>/common/<함수명을 케밥케이스로 변환한 파일명>.ts` 파일을 신규 생성하고, 해당 파일에 작성한다. (아래 예시 참고)<br>
```
로그인 페이지의 UI 컴포넌트들을 검증하는 expectLoginPage 함수는 tests/login/common/expect-login-page.ts 파일 생성 후 해당 파일에 작성한다.
```
4. 하나의 파일에는 하나의 함수만 작성한다.
5. 함수를 신규로 구현하기 전에 동일한 기능을 하는 함수가 이미 구현되어 있는지 탐색하고, 이미 구현되어있는 함수를 재사용하기 전에는 사용자에게 사전 승인을 받는다.
