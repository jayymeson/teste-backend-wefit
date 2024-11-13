gerar
npm run migration:generate -- src/infra/adapters/orm/typeorm/migrations/CreateProfileTable

excutar
npm run typeorm migration:run -d src/infra/adapters/orm/typeorm/config.ts
