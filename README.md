# medusa-store-e2e
Playwright 기반의 medusa-store E2E 자동화 테스트

## 시작하기

Node.js 22 이상과 pnpm 12.4.2를 사용합니다.

```sh
pnpm install --frozen-lockfile
pnpm browsers:install
cp .env.example .env
```

Medusa 백엔드와 storefront를 별도로 실행하고 `.env`의 `BASE_URL`을
storefront 주소로 지정하세요. 
