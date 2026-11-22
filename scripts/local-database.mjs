import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';

export function localDatabase(variable, database) {
  let url;
  try {
    url = new URL(process.env[variable]);
  } catch {
    throw new Error(`${variable} is missing or invalid.`);
  }
  if (url.protocol !== 'mysql:' || !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
    || (url.port || '3306') !== '3306' || url.pathname !== `/${database}`) {
    throw new Error(`${variable} must target local ${database} on port 3306.`);
  }
  return url.href;
}

export function migrationFiles() {
  const root = new URL('../prisma/migrations/', import.meta.url);
  return readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory())
    .map(entry => entry.name).sort()
    .map(name => {
      const sql = readFileSync(new URL(`${name}/migration.sql`, root), 'utf8');
      const lines = sql.replaceAll('\r\n', '\n');
      const checksums = [sql, lines, lines.replaceAll('\n', '\r\n')]
        .map(content => createHash('sha256').update(content).digest('hex'));
      return { name, checksums };
    });
}

export async function verifyHistory(db, { allowPending = false } = {}) {
  const rows = await db.$queryRaw`
    SELECT migration_name, checksum, finished_at, rolled_back_at
    FROM _prisma_migrations ORDER BY started_at, id
  `;
  const applied = rows.filter(row => !row.rolled_back_at);
  const expected = migrationFiles();
  if ((!allowPending && applied.length !== expected.length) || applied.length > expected.length
    || applied.some((row, i) => !row.finished_at || row.migration_name !== expected[i].name
      || !expected[i].checksums.includes(row.checksum))) {
    throw new Error('Migration history or checksum mismatch.');
  }
  return { applied: applied.length, pending: expected.length - applied.length };
}

export function safeFailure(error) {
  const code = error?.code ?? error?.errorCode;
  if (error?.name === 'PrismaClientInitializationError' && error.message.includes("Can't reach database server")) {
    return 'DB_UNREACHABLE';
  }
  return typeof code === 'string' && /^[A-Z0-9_]+$/.test(code) ? code : 'CHECK_FAILED';
}
