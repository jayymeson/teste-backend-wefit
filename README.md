gerar
npm run migration:generate -- src/infra/adapters/orm/typeorm/migrations/~FlagOfMigration~

excutar
npm run typeorm migration:run -d src/infra/adapters/orm/typeorm/config.ts

npm run migration:run

npm i --legacy-peer-deps