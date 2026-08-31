# Bloglist E2E -testit

End-to-end -testit Playwrightillä bloglist-sovellukselle.

## Asennus

```bash
npm install
npx playwright install
```

## Ajaminen

**Ennen testien ajamista** käynnistä sekä backend että frontend:

Terminaali 1 (backend):
```bash
cd ../../osa4/bloglist
NODE_ENV=test npm run start
```

**HUOM:** Backend pitää käynnistää `NODE_ENV=test`-tilassa, jotta `/api/testing/reset`-endpoint on käytettävissä. Se on saatavilla **vain** testitilassa.

Terminaali 2 (frontend):
```bash
cd ../bloglist-frontend
npm run dev
```

Terminaali 3 (testit):
```bash
npm test
```

## Testien tarkastelu selaimessa

```bash
npm run test:report
```

## Käynnistys interaktiivisesti

```bash
npx playwright test --ui
```
