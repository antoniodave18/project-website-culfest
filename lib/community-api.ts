import { Prisma } from '@prisma/client';
import { adminJson, guardAdmin } from './admin-auth';
import { CommunityError, isCommunityId } from './communities';

export async function communityRequest(request: Request, action: () => Promise<Response>, id?: string) {
  const denied = await guardAdmin(request);
  if (denied) return denied;
  try {
    if (id !== undefined && !isCommunityId(id)) throw new CommunityError('ID komunitas tidak valid.');
    return await action();
  } catch (error) {
    if (error instanceof CommunityError) {
      return adminJson({ success: false, message: error.message, field: error.field }, error.status);
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return adminJson({ success: false, message: 'Slug sudah digunakan. Pilih slug lain.', field: 'slug' }, 409);
    }
    return adminJson({ success: false, message: 'Komunitas tidak dapat diproses. Coba lagi.' }, 500);
  }
}

export async function communityBody(request: Request): Promise<Record<string, unknown>> {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json' || !request.body) {
    throw new CommunityError('Kirim data dalam format JSON.', 415);
  }
  const reader = request.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let size = 0;
  let body = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 128 * 1024) {
        void reader.cancel().catch(() => {});
        throw new CommunityError('Data melebihi batas ukuran.', 413);
      }
      body += decoder.decode(value, { stream: true });
    }
    const data: unknown = JSON.parse(body + decoder.decode());
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error();
    return data as Record<string, unknown>;
  } catch (error) {
    if (error instanceof CommunityError) throw error;
    throw new CommunityError('Data JSON tidak valid.');
  } finally {
    reader.releaseLock();
  }
}
