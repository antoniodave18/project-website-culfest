import { pathToFileURL } from 'node:url';
import { PrismaClient } from '@prisma/client';
import { localDatabase, verifyHistory, safeFailure } from './local-database.mjs';

import { provision } from '../lib/provision-workspace.mjs';

export async function provisionAll(db) {
  return db.$transaction(async tx => {
    const communities = await tx.$queryRaw`SELECT id, name, slug FROM Community ORDER BY id FOR UPDATE`;
    for (const community of communities) await provision(tx, community);
    return communities.length;
  }, { timeout: 60000, isolationLevel: 'ReadCommitted' });
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  let db;
  try {
    db = new PrismaClient({ datasourceUrl: localDatabase('DATABASE_URL', 'culfest_dev') });
    await verifyHistory(db);
    console.log('Workspaces checked:', await provisionAll(db));
  } catch (error) {
    console.error('Workspace provisioning failed:', safeFailure(error));
    process.exitCode = 1;
  } finally { await db?.$disconnect(); }
}
