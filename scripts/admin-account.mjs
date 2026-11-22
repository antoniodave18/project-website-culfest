import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from 'better-auth/crypto';
import { localDatabase, safeFailure } from './local-database.mjs';

const [action, address, ...extra] = process.argv.slice(2);
const email = address?.trim().toLowerCase();
if (!['provision', 'revoke'].includes(action) || !email || email.length > 191
  || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || extra.length) {
  console.error('Usage: npm run admin:account -- <provision|revoke> <email>');
  process.exit(1);
}

let db;
try {
  db = new PrismaClient({ datasourceUrl: localDatabase('DATABASE_URL', 'culfest_dev') });
  if (action === 'provision') {
    if (process.stdin.isTTY) throw new Error('Pipe a masked password to standard input.');
    const password = readFileSync(0, 'utf8').replace(/\r?\n$/, '');
    if (password.length < 12 || password.length > 128) throw new Error('Use 12 to 128 characters.');
    const id = randomUUID();
    await db.user.create({ data: {
      id, name: email, email, role: 'PLATFORM_ADMIN',
      accounts: { create: {
        id: randomUUID(), providerId: 'credential', accountId: id,
        password: await hashPassword(password),
      } },
    } });
    console.log('Local administrator provisioned.');
  } else {
    await db.$transaction(async tx => {
      const user = await tx.user.update({ where: { email }, data: { role: 'USER' }, select: { id: true } });
      await tx.session.deleteMany({ where: { userId: user.id } });
    });
    console.log('Local administrator demoted and sessions revoked.');
  }
} catch (error) {
  const code = safeFailure(error);
  console.error(code === 'P2002'
    ? 'An account already exists. Its credentials and role were preserved.'
    : `Admin account operation failed (${code}). Provisioning requires a masked 12–128 character password on stdin.`);
  process.exitCode = 1;
} finally {
  await db?.$disconnect();
}
