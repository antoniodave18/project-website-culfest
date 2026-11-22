import { PrismaClient } from '@prisma/client';
import { localDatabase, safeFailure, verifyHistory } from './local-database.mjs';

for (const [variable, database] of [
  ['DATABASE_URL', 'culfest_dev'],
  ['TEST_DATABASE_URL', 'culfest_test'],
  ['SHADOW_DATABASE_URL', 'culfest_shadow'],
]) {
  let db;
  try {
    db = new PrismaClient({ datasourceUrl: localDatabase(variable, database) });
    const [result] = await db.$queryRaw`SELECT DATABASE() AS schema_name`;
    if (result.schema_name !== database) throw new Error();
    console.log(`${database}: connected.`);
    if (database !== 'culfest_shadow') {
      const [history] = await db.$queryRaw`
        SELECT COUNT(*) AS table_count, COUNT(CASE WHEN table_name = '_prisma_migrations' THEN 1 END) AS present
        FROM information_schema.tables WHERE table_schema = DATABASE()
      `;
      if (Number(history.table_count) === 0) {
        console.log(`${database}: empty schema; migration history absent.`);
      } else if (Number(history.present) === 0) {
        console.error(`${database}: existing tables without Prisma migration history.`);
        process.exitCode = 1;
      } else {
        const { applied, pending } = await verifyHistory(db, { allowPending: true });
        console.log(`${database}: ${applied} migration checksums verified, ${pending} pending.`);
      }
    }
  } catch (error) {
    console.error(`${database}: ${safeFailure(error)}.`);
    process.exitCode = 1;
  } finally {
    await db?.$disconnect();
  }
}
