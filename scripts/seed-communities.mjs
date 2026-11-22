import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '@prisma/client';
import { localDatabase, safeFailure, verifyHistory } from './local-database.mjs';

const profiles = JSON.parse(readFileSync(new URL('../prisma/ormada-seed.json', import.meta.url), 'utf8'));
const publicRoot = new URL('../public/', import.meta.url);

export async function seedCommunities(db) {
  const missingLogos = [];
  const data = profiles.map(profile => {
    const hasLogo = existsSync(new URL(profile.logoUrl.slice(1), publicRoot));
    if (!hasLogo) missingLogos.push(profile.slug);
    return {
      ...profile,
      logoUrl: hasLogo ? profile.logoUrl : '/images/logo-culfest.png',
      publicationStatus: 'PUBLISHED',
      slugLocked: true,
    };
  });
  const { count } = await db.community.createMany({ data, skipDuplicates: true });
  return { inserted: count, skipped: data.length - count, missingLogos };
}

// The same function is used by the disposable integration suite.
if (process.argv[1] && process.argv[1] === fileURLToPath(import.meta.url)) {
  let db;
  try {
    const args = process.argv.slice(2);
    if (args.length && (args.length !== 1 || args[0] !== '--test')) {
      throw new Error('Unsupported seed argument.');
    }
    const url = args.length ? localDatabase('TEST_DATABASE_URL', 'culfest_test')
      : localDatabase('DATABASE_URL', 'culfest_dev');
    db = new PrismaClient({ datasourceUrl: url });
    await verifyHistory(db);
    console.log(JSON.stringify(await seedCommunities(db)));
  } catch (error) {
    console.error(`Community seed failed: ${safeFailure(error)}.`);
    process.exitCode = 1;
  } finally {
    await db?.$disconnect();
  }
}
